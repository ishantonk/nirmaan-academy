'use client';

import Image from "next/image";

const facultyMembers = [
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    image: "/1.png",
  },
  {
    name: "Dries Vincent",
    role: "Business Relations",
    image: "/2.png",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    image: "/3.png",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
    image: "/4.png",
  },
  {
    name: "Tom Cook",
    role: "Director of Product",
    image: "/5.png",
  },
  {
    name: "Whitney Francis",
    role: "Copywriter",
    image: "/2.png",
  },
];
export default function FacultyPage() {

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">Our team</h1>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl">
          We&apos;re a dynamic group of individuals who are passionate about what we do
          and dedicated to delivering the best results for our clients.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {facultyMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}