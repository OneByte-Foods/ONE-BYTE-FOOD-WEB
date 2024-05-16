import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="w-full px-[100pxx]">
      <div className="container">
        <div className="text-center mb-20 max-w-[400px] mx-auto">
          <p className="text-sm text-orange-500 to-secondary ">Frequently Asked Question</p>
          <h1 className="text-3xl font-bold">FAQ</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis delectus architecto error nesciunt,
          </p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full px-[100px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the system handle table reservations?
          </AccordionTrigger>
          <AccordionContent>
            Our restaurant management system allows you to efficiently manage
            table reservations. You can easily view available tables, book them
            for specific time slots, and even modify or cancel reservations as
            needed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Can I track inventory and ingredients?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. Our system includes robust inventory management features
            that enable you to track ingredient quantities in real-time. You can
            set up alerts for low stock levels and even automate reordering
            processes to ensure smooth operations.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Does it integrate with payment systems?
          </AccordionTrigger>
          <AccordionContent>
            Yes, our restaurant management system seamlessly integrates with
            popular payment gateways, allowing you to accept payments online or
            in-person. You can also generate detailed reports for financial
            analysis and accounting purposes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Is there support for menu customization?
          </AccordionTrigger>
          <AccordionContent>
            Certainly. Our system offers extensive menu customization options,
            enabling you to easily add, remove, or modify menu items based on
            seasonal changes, customer preferences, or special promotions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
