"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import gsap from "gsap";

interface TimelineItem {
  id: number;
  month: string;
  title: string;
  description: string;
}

function Page() {
  const [items, setItems] = useState<TimelineItem[]>([
    {
      id: 1,
      month: "February 2022",
      title: "Application UI code in Tailwind CSS",
      description:
        "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
    },
  ]);
  const timelineRef = useRef<HTMLUListElement>(null);

  // Function to scroll to the bottom
  //of the div using scrollIntoView method

  useLayoutEffect(() => {
    const scrollableDiv: any = document.getElementById("timeline");
    var bottomElement = scrollableDiv.lastElementChild;
    bottomElement.scrollIntoView({ behavior: "smooth", block: "end" });
    // gsap.to("#timeline", {
    //   y: 0,
    //   duration: 1,
    //   stagger: 0.2,
    //   ease: "power3.out"
    // });
  }, [items]);

  const addItem = () => {
    const newItem: TimelineItem = {
      id: items.length + 1,
      month: "March 2022",
      title: "New Item",
      description: "Description of the new item",
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="flex w-screen h-screen">
      <Button onClick={addItem}>Add Item</Button>

      <div className="h-screen w-[60%] border no-scrollbar px-10 overflow-y-auto">
        <Timeline id="timeline" className=" h-fit border-l-2">
          {items.map((item) => (
            <Timeline.Item key={item.id}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>{item.month}</Timeline.Time>
                <Timeline.Title>{item.title}</Timeline.Title>
                <Timeline.Body>{item.description}</Timeline.Body>
                <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default Page;
