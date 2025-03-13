"use client";

import CourseDetail from "@/components/course/course-detail";
import { courses } from "@/dummy-data";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
    const { slug } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        getCourseDetails();
    }, [slug]);

    const getCourseDetails = () => {
        const course = courses.find((course) => course.slug === slug);
        setCourseDetails(course || null);
    };

    if (!courseDetails) {
        return <p>Course not found.</p>;
    }

    return <CourseDetail course={courseDetails} />;
}
