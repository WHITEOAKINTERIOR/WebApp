'use client';
import { EnquiryForm } from "@/components/enquiry-form";
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

import { Map } from '@/components/Map'
import { commonContent } from "@/content/sharedContent";
import { PageHero } from "@/components/shared/page-hero";

export default function ContactPage() {


  return (
    <div className="min-h-screen">
      <PageHero
        title={"Get in Touch"}
        description={"We'd love to hear from you"}
      />

      {/* Contact Info & Form Section */}
      <div className="py-16 bg-gray-50" id="contact-form">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">


            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border h-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-gray-600">Have questions or want to discuss your project? Fill out the form below and our team will get back to you within 24 hours.</p>
              </div>

              <div className="px-2 md:px-16">
                <EnquiryForm showMessage={true} showLookingFor={false} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="h-full flex flex-col">
              <div className="bg-white p-8 rounded-xl shadow-sm border h-full flex flex-col">
                <div className="space-y-6 flex-1">
                  <h2 className="text-2xl font-bold">Our Office</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Visit Us</h3>
                        <p className="text-gray-600">{commonContent.Address}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email Us</h3>
                        <a href={commonContent.Email} className="text-primary hover:underline">{commonContent.Email}</a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Call Us</h3>
                        <a href={`tel:${commonContent.phone}`} className="text-primary hover:underline">{commonContent.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Hours Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                    <div className="w-full">
                      <h3 className="font-medium text-gray-900 mb-3">Working Hours</h3>
                      <div className="bg-gray-50 rounded-lg p-0 md:p-4 space-y-2">
                        {[
                          'Monday: 9:00 AM - 6:00 PM',
                          'Tuesday: 9:00 AM - 6:00 PM',
                          'Wednesday: 9:00 AM - 6:00 PM',
                          'Thursday: 9:00 AM - 6:00 PM',
                          'Friday: 9:00 AM - 6:00 PM',
                          'Saturday: 10:00 AM - 4:00 PM',
                          'Sunday: Closed'
                        ].map((time, index) => (
                          <div key={index} className="flex justify-between items-center py-1 px-2 hover:bg-gray-100 rounded">
                            <span className="text-gray-700 font-medium">{time.split(':')[0]}:</span>
                            <span className="text-gray-600">{time.split(':').slice(1).join(':').trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white py-16" id="map">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Location</h2>
          <Map
            height="500px"
            markerText={commonContent.companyName}
            subText={commonContent.Address} />
        </div>
      </div>
    </div>
  );
}
