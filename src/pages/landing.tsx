import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [longUrl, setLongUrl] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLongUrl(value);
  };

  const handleShorten = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (longUrl.length) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-5xl lg:text-7xl text-center font-extrabold">
        Short and sweet 🍬 <br />
        like your content should be.
      </h2>

      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-3/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          required
          onChange={handleChange}
          placeholder="Got a big one? Let’s cut it down"
          className="h-full flex-1 p-4"
        />
        <Button className="h-full" type="submit" variant={"destructive"}>
          Shortn!
        </Button>
      </form>

      <Accordion type="single" collapsible className="w-full mt-20 md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is Shortn safe to use?</AccordionTrigger>
          <AccordionContent>
            🔐 Yes. We make sure your links and data stay secure. Only you can
            access your shortened links and analytics when you're logged in.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use Shortn?
          </AccordionTrigger>
          <AccordionContent>
            ✅ Yes! You’ll need to sign up and log in before shortening any
            links. This helps us save your history, track your analytics, and
            make sure your links stay secure and accessible only by you.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            What happens after I shorten a link?
          </AccordionTrigger>
          <AccordionContent>
            🔗 You get two things: A clean, shortened URL and a downloadable QR
            code! You can copy the link with one click or download the QR code
            to use anywhere — on print, posters, social media, or business
            cards.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Can I save multiple links on my account?
          </AccordionTrigger>
          <AccordionContent>
            📁 Absolutely! Every link you shorten is saved under your profile.
            You can access, copy, or download the QR code for each one anytime —
            all in one place.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            Does Shortn track who clicks my links?
          </AccordionTrigger>
          <AccordionContent>
            📊 Yes — in a privacy-friendly way. We provide smart analytics for
            each link:
            <ul>
              <li>• Click count</li>
              <li>• Country of the visitor 🌍</li>
              <li>• Device used (mobile, tablet, desktop) 📱💻</li>
            </ul>
            All displayed in easy-to-read charts so you can understand your
            audience better.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            Is the QR code really free to download?
          </AccordionTrigger>
          <AccordionContent>
            🆓 Totally. Every shortened link comes with a free QR code. No
            hidden fees. No watermark. Ready to use wherever you want.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default LandingPage;
