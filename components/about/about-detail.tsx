"use client";

import { Separator } from "@/components/ui/separator";
import { aboutUsData } from "@/dummy-data";

export default function AboutUs() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Story</h2>
                <p className="text-gray-700">{aboutUsData.description}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {aboutUsData.why_choose_us.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Vision & Mission</h2>
                <p>
                    <strong>Vision:</strong> {aboutUsData.vision_mission.vision}
                </p>
                <p>
                    <strong>Mission:</strong>{" "}
                    {aboutUsData.vision_mission.mission}
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Meet Our Founder</h2>
                <p className="font-semibold">{aboutUsData.founder.name}</p>
                <p>{aboutUsData.founder.experience}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {aboutUsData.founder.achievements.map(
                        (achievement, index) => (
                            <li key={index}>{achievement}</li>
                        )
                    )}
                </ul>
            </div>

            <Separator />

            <div className="text-center text-gray-700">
                <p>
                    <strong>Address:</strong> {aboutUsData.contact.address}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    <a
                        href={`mailto:${aboutUsData.contact.email}`}
                        className="text-blue-600 hover:underline"
                    >
                        {aboutUsData.contact.email}
                    </a>
                </p>
            </div>
        </div>
    );
}
