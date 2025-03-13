import Image from "next/image";

type FacultyProp = {
    id: number;
    image: string;
    name: string;
    role: string;
};

export default function FacultyCard({ faculty }: { faculty: FacultyProp }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
                <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    className="rounded-full object-cover"
                />
            </div>
            <h3 className="text-lg font-medium text-primary">{faculty.name}</h3>
            <p className="text-sm text-muted-foreground">{faculty.role}</p>
        </div>
    );
}
