"use client";

import { useState } from "react";
import { Building2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden shadow-sm">
        {/* Left Column - Contact Information */}
        <div className="bg-gray-50 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-site-primary mb-6">Get in touch</h1>
          <p className="text-site-secondary mb-8">
            Feel free to reach out to us with any questions or concerns. We&apos;re here to help!
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Building2 className="h-6 w-6 text-site-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-site-secondary">545 Mavis Island</p>
                <p className="text-site-secondary">Chicago, IL 99191</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-site-primary flex-shrink-0" />
              <p className="text-site-secondary">+1 (555) 234-5678</p>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-site-primary flex-shrink-0" />
              <p className="text-site-secondary">hello@example.com</p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-site-secondary" htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-site-secondary" htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-site-secondary" htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-site-secondary" htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-site-secondary" htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full min-h-[120px]"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-site-secondary hover:bg-site-primary text-site-accent">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}