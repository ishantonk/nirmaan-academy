import { NoticeBoard } from "@/app/components/noticeBoard";
import ImageCarousel from "@/components/layout/carousel/image-carousel";
import { notices } from "@/dummy-data";

export default function Hero() {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg: items-end">
                <div className="col-span-2">
                    <NoticeBoard notices={notices} />
                </div>
                <div className="col-span-3">
                    <ImageCarousel />
                </div>
                <div className="col-span-2">
                    <NoticeBoard notices={notices} />
                </div>
            </div>
        </section>
    );
}
