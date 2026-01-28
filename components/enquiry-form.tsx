// components/enquiry-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "./ui/textarea"
import { formatAddress, getLocation } from "@/lib/location"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }).optional().or(z.literal("")),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    message: z.string().optional(),
    lookingFor: z.enum(["residential", "commercial"]).optional(),
}).refine(
    (data) => data.email || data.phone,
    {
        message: "Either email or phone is required",
        path: ["email"],
    }
)

interface EnquiryFormProps {
    onSuccess?: () => void;
    showMessage?: boolean;
    showLookingFor?: boolean;
    subject?: string;
    propertyData?: {
        propertyType: string;
        rooms: string;
        style: string;
        selectedAreas: { [key: string]: boolean };
    };
}

export function EnquiryForm({ 
    onSuccess,
    showMessage = false,
    showLookingFor = true,
    subject = "New Enquiry",
    propertyData }: EnquiryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const beaconSentRef = useRef(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            ...(showMessage && { message: "" }),
            ...(showLookingFor && { lookingFor: "residential" })
        },
    })

    // In your form component
    useEffect(() => {
        // Handle tab/window switch
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && shouldAutoSubmit()) {
                sendBeacon();
            }
        };

        // Handle page unload
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (shouldAutoSubmit()) {
                sendBeacon();
                // Modern browsers require this to show confirmation dialog
                e.preventDefault();
                e.returnValue = '';
            }
        };

        // Handle mouse leave (optional)
        // const handleMouseLeave = (e: MouseEvent) => {
        //     if (e.clientY < 0 && shouldAutoSubmit()) {
        //         sendBeacon();
        //     }
        // };

        // Use sendBeacon for reliable submission
        const sendBeacon = async () => {

            // Prevent duplicate submissions
            if (beaconSentRef.current) {
                return;
            }

            try {
                beaconSentRef.current = true; // Mark as sent
                const { email, phone } = form.getValues();
                const location = await getLocation(true); // You might want to handle this differently for beacon

                const data = {
                    email: email || '',
                    phone: phone || '',
                    auto_submit: true,
                    // Include other necessary fields with default values
                    name: '',
                    message: '',
                    address: formatAddress(location.address),
                    address_method: 'IP'
                };

                if (navigator.sendBeacon) {
                    const blob = new Blob(
                        [JSON.stringify(data)],
                        { type: 'application/json' }
                    );
                    navigator.sendBeacon('/api/contact', blob);
                } else {
                    // Fallback to fetch with keepalive
                    fetch('/api/contact', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        keepalive: true // This is the key part
                    }).catch(console.error);
                }
            } catch (error) {
                // Reset the flag on error to allow retries
                beaconSentRef.current = false;
            }
        };

        // Add event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);
        // document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            // Clean up
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            beaconSentRef.current = false; // Reset on unmount
            // document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [form.getValues()]);

    // Helper function to determine if we should auto-submit
    const shouldAutoSubmit = () => {
        const { email, phone } = form.getValues();
        const emailState = form.getFieldState('email');
        const phoneState = form.getFieldState('phone');

        // Check if fields are valid (either valid or empty)
        const isEmailValid = !email || !emailState.invalid;
        const isPhoneValid = !phone || !phoneState.invalid;

        // Only auto-submit if exactly one field is filled and valid
        return (email && !phone && isEmailValid) ||
            (!email && phone && isPhoneValid);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true)
            const location = await getLocation();

            // Format the address for display
            const formattedAddress = formatAddress(location.address);

            // Prepare submission data with cost estimation details
            const submissionData = {
                ...values,
                address: formattedAddress,
                address_method: location.method,
                subject: subject,
                property: propertyData ? {
                    propertyType: propertyData.propertyType,
                    rooms: propertyData.rooms,
                    style: propertyData.style,
                    selectedAreas: Object.entries(propertyData.selectedAreas)
                        .filter(([_, selected]) => selected)
                        .map(([area]) => area)
                } : undefined
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            })
            if (response.ok) {
                toast({
                    title: "Success!",
                    variant: "success",
                    description: "Your request has been sent successfully. You will be contacted soon by our team, Thank You!",
                })
                form.reset()
                onSuccess?.()
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            toast({
                title: "Error",
                description: "There was an error submitting your request. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md">
                <div className="space-y-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-1">
                        {showLookingFor && (<FormField
                            control={form.control}
                            name="lookingFor"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Looking for</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-x-4 justify-between"
                                        >
                                            <FormItem className="flex items-center space-x-2 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="residential" />
                                                </FormControl>
                                                <FormLabel className="font-light hover:cursor-pointer">Residential</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2 space-y-0 hover:cursor-pointer">
                                                <FormControl>
                                                    <RadioGroupItem value="commercial" />
                                                </FormControl>
                                                <FormLabel className="font-light hover:cursor-pointer">Commercial</FormLabel>
                                            </FormItem>

                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />)}

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <div className="min-h-[15px]">
                                        <FormMessage className="text-sm" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact number" {...field} />
                                    </FormControl>
                                    <div className="min-h-[15px]">
                                        <FormMessage className="text-sm" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact email" {...field} />
                                    </FormControl>
                                    <div className="min-h-[15px]">
                                        <FormMessage className="text-sm" />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {showMessage && (
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us more about your project..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                    <div className="pt-0">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}