"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  Bed,
  Coffee,
  Copy,
  Luggage,
  Mail,
  MessageCircle,
  ParkingCircle,
  Phone,
  Share2,
  ShowerHead,
  Snowflake,
  Tv,
  Utensils,
  Wifi,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import BookingDetails from "@/components/website/room/BookingDetails";
import { useCompanyBasicInfo } from "@/providers/CompanyBasicInfoProvider";

const amenityIcons = {
  Restaurant: Utensils,
  Bed,
  "Room Phone": Phone,
  Parking: ParkingCircle,
  Shower: ShowerHead,
  "Towel In Room": Bath,
  "Wi-Fi": Wifi,
  Television: Tv,
  "Bath Tub": Bath,
  Elevator: Luggage,
  Laggage: Luggage,
  "Tea Maker": Coffee,
  "Room AC": Snowflake,
};

function formatPrice(value) {
  if (value == null || value === "") return "—";
  return `₹${new Intl.NumberFormat("en-IN").format(Number(value) || 0)}`;
}

/** Renders occupancy labels with "Pax" in primary color, e.g. 01 Pax */
function PaxLabel({ value, className }) {
  const text = String(value || "");
  const match = text.match(/^(.*?)(\s*)(Pax)$/i);
  if (!match) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className}>
      {match[1]}
      {match[2]}
      <span className="text-primary">{match[3]}</span>
    </span>
  );
}

function stripHtmlPreview(html = "", wordLimit = 36) {
  const text = String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ").filter(Boolean);
  if (words.length <= wordLimit) {
    return { preview: text, truncated: false, words };
  }
  return {
    preview: `${words.slice(0, wordLimit).join(" ")}…`,
    truncated: true,
    words,
  };
}

export default function RoomDetailView({ data }) {
  const companyInfo = useCompanyBasicInfo();
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [expertForm, setExpertForm] = useState({
    name: "",
    email: "",
    phone: "",
    need: "Appointment",
    question: "",
    contactMethod: "Phone",
  });
  const [submittingExpert, setSubmittingExpert] = useState(false);
  const [showShareBox, setShowShareBox] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [rooms, setRooms] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const mainPhotoUrl = data?.mainPhoto?.url || data?.mainPhotot?.url || "";
  const allImagesRaw = [
    mainPhotoUrl,
    ...(data?.relatedPhotos?.map((img) => img.url) || []),
  ];
  const allImages = allImagesRaw.filter(
    (img) => typeof img === "string" && img.trim().length > 0
  );
  const gallery = allImages.length ? allImages : [];

  const priceRows = data?.prices?.[0]?.prices || [];
  const baseRate =
    priceRows.find((p) => p.type === "01 Pax") ||
    priceRows.find((p) => p.type === "02 Pax");
  const maxOccupancy = priceRows.some((p) => p.type === "02 Pax")
    ? "02 Pax"
    : priceRows.some((p) => p.type === "01 Pax")
      ? "01 Pax"
      : "—";
  const extraBed = priceRows.some((p) => p.type === "Extra Bed");
  const descriptionMeta = stripHtmlPreview(data?.paragraph || "");
  const preview = descriptionMeta?.preview || "";
  const isTruncated = Boolean(descriptionMeta?.truncated);

  useEffect(() => {
    if (typeof window !== "undefined" && data?.slug) {
      setProductUrl(`${window.location.origin}/hotel/${data.slug}`);
    }
  }, [data?.slug]);

  useEffect(() => {
    if (data?.rooms) {
      setRooms(data.rooms);
    } else if (data?.slug) {
      fetch(`/api/room/relatedRooms?slug=${encodeURIComponent(data.slug)}`)
        .then((res) => res.json())
        .then((res) => setRooms(res.relatedRooms || []))
        .catch(() => setRooms([]));
    }
  }, [data?.slug, data?.rooms]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveImageIdx(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    setActiveImageIdx(carouselApi.selectedScrollSnap());
    return () => carouselApi.off("select", onSelect);
  }, [carouselApi]);

  useEffect(() => {
    if (!showShareBox) return;
    function handleClick(e) {
      const pop = document.getElementById("share-popover");
      if (pop && !pop.contains(e.target)) setShowShareBox(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showShareBox]);


  const whatsappMessage = [
    "Dear Reservations Team,",
    "",
    "Greetings For Hotel Kedar Heaven!",
    "",
    "We are writing to inquire about room availability at your esteemed property for our upcoming dates. Could you please share the availability status along with the pricing details for your Deluxe Room category?",
    "",
    "We look forward to your prompt response so we can proceed with our travel plans.",
    "",
    "--- Details ---",
    `Room: ${data?.title || "—"}`,
    data?.code ? `Code: ${data.code}` : null,
    baseRate
      ? `Base rate: ${formatPrice(baseRate.amount)} / night (${baseRate.type})`
      : null,
    data?.slug ? `Page: ${process.env.NEXT_PUBLIC_SITE_URL}/hotel/${data.slug}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return (
    <div className="min-h-screen bg-background font-body">
      <Section spacing="sm">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:gap-10">
            {/* Gallery — left */}
            <div>
              <div className="relative overflow-hidden rounded-image bg-surface">
                {gallery.length > 0 ? (
                  <Carousel
                    className="w-full"
                    opts={{ loop: true }}
                    plugins={[Autoplay({ delay: 4500 })]}
                    setApi={setCarouselApi}
                  >
                    <CarouselContent>
                      {gallery.map((img, idx) => (
                        <CarouselItem key={`${img}-${idx}`}>
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={img}
                              alt={`${data.title} image ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              priority={idx === 0}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {gallery.length > 1 ? (
                      <>
                        <CarouselPrevious className="left-3 z-10 size-10 border-0 bg-card/90 text-heading shadow-sm hover:bg-card" />
                        <CarouselNext className="right-3 z-10 size-10 border-0 bg-card/90 text-heading shadow-sm hover:bg-card" />
                      </>
                    ) : null}
                  </Carousel>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center font-body text-sm text-muted">
                    No images available
                  </div>
                )}
              </div>

              {gallery.length > 1 ? (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={`thumb-${idx}`}
                      type="button"
                      onClick={() => carouselApi?.scrollTo(idx)}
                      className={cn(
                        "relative size-14 shrink-0 overflow-hidden rounded-image border transition-colors sm:size-16",
                        activeImageIdx === idx
                          ? "border-primary"
                          : "border-border"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${data.title} thumb ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Details — right */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h1 className="font-heading text-3xl font-medium leading-tight text-heading md:text-4xl">
                  {data?.title}
                </h1>
                {data?.code ? (
                  <span className="shrink-0 rounded-button border border-border bg-card px-3 py-1.5 font-ui text-xs tracking-wide text-muted">
                    Code: {data.code}
                  </span>
                ) : null}
              </div>

              {data?.heading ? (
                <p className="font-body text-sm text-muted md:text-base">
                  {data.heading}
                </p>
              ) : null}

              {data?.paragraph ? (
                <div className="font-body text-sm leading-relaxed text-muted">
                  {showFullDesc || !isTruncated ? (
                    <div
                      className="prose prose-neutral max-w-none text-sm"
                      dangerouslySetInnerHTML={{ __html: data.paragraph }}
                    />
                  ) : (
                    <p>{preview}</p>
                  )}
                  {isTruncated ? (
                    <button
                      type="button"
                      className="mt-2 font-ui text-sm font-medium text-primary hover:underline"
                      onClick={() => setShowFullDesc((v) => !v)}
                    >
                      {showFullDesc ? "Show less" : "Read more"}
                    </button>
                  ) : null}
                </div>
              ) : (
                <p className="font-body text-sm text-muted">No Description</p>
              )}
              <p className="font-body text-base font-semibold text-primary md:text-lg">
                {baseRate ? (
                  <>
                    Room Base Rate for{" "}
                    <PaxLabel value={baseRate.type} />{" "}
                    {formatPrice(baseRate.amount)}
                  </>
                ) : (
                  "Rate available on enquiry"
                )}
              </p>

              <div className="overflow-hidden rounded-card border border-border">
                <table className="w-full text-left">
                  <thead className="bg-surface">
                    <tr>
                      <th className="px-3 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                        Person
                      </th>
                      <th className="px-3 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                        Price For Night
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["01 Pax", "02 Pax", "Extra Bed"].map((type) => {
                      const row = priceRows.find((p) => p.type === type);
                      if (!row) return null;
                      return (
                        <tr key={type} className="border-t border-border/60 bg-card">
                          <td className="px-3 py-2.5 font-body text-sm text-heading">
                            <PaxLabel value={type} />
                          </td>
                          <td className="px-3 py-2.5 font-body text-sm text-heading">
                            {formatPrice(row.amount)}
                          </td>
                        </tr>
                      );
                    })}
                    {priceRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-3 py-4 font-body text-sm text-muted"
                        >
                          Pricing will appear once configured.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              {(data.amenities || []).length > 0 ? (
                <div>
                  <h2 className="font-heading text-lg font-medium text-heading">
                    Room Amenities
                  </h2>
                  <TooltipProvider>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(data.amenities || []).map((am, i) => {
                        const Icon = amenityIcons[am.label] || Bed;
                        return (
                          <Tooltip key={am._id || i}>
                            <TooltipTrigger className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:text-primary">
                              <Icon className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>{am.label}</TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                </div>
              ) : null}

              <div className="space-y-1 font-body text-sm text-heading">
                <p>
                  Max occupancy:{" "}
                  <PaxLabel value={maxOccupancy} className="font-medium" />
                </p>
                <p>Extra bed available: {extraBed ? "Yes" : "No"}</p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    nativeButton={false}
                    render={
                      <a
                        href={`https://wa.me/918006000325?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </Button>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowShareBox((prev) => !prev)}
                      aria-label="Share room"
                    >
                      <Share2 className="size-4" />
                    </Button>
                    {showShareBox ? (
                      <div
                        id="share-popover"
                        className="absolute right-0 z-20 mt-2 w-72 rounded-card border border-border bg-card p-4 shadow-sm"
                      >
                        <p className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                          Share room
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Input
                            value={productUrl}
                            readOnly
                            className="bg-surface text-xs"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              navigator.clipboard.writeText(productUrl);
                              toast.success("Link copied.");
                            }}
                          >
                            <Copy className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section spacing="md" className="bg-surface">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-card border border-border bg-card p-6">
              <h3 className="font-heading text-xl font-medium text-heading">
                Stay notes
              </h3>
              <div className="mt-5 space-y-4 font-body text-sm leading-relaxed text-muted">
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-heading">
                    Check-in
                  </p>
                  <p className="mt-1">
                    Guests receive arrival guidance before check-in. Front desk
                    staff will greet you on arrival.
                  </p>
                </div>
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-heading">
                    Pets
                  </p>
                  <p className="mt-1">Pets are not allowed.</p>
                </div>
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-heading">
                    Children
                  </p>
                  <p className="mt-1">
                    Children are welcome. Extra bedding may be available on
                    request.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-card border border-border bg-card p-6">
              <h3 className="font-heading text-xl font-medium text-heading">
                Timings
              </h3>
              <div className="mt-5 space-y-4 font-body text-sm leading-relaxed text-muted">
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-heading">
                    Check-in
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    <li>From 12:00 PM</li>
                    <li>Early check-in subject to availability</li>
                  </ul>
                </div>
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-heading">
                    Check-out
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    <li>Before 11:00 AM</li>
                    <li>Late check-out subject to availability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {rooms.length > 0 ? (
        <Section spacing="md">
          <Container>
            <h2 className="font-heading text-3xl font-medium text-heading">
              Our Rooms
            </h2>
            <p className="mt-2 font-body text-sm text-muted mb-8">
              Explore the rooms available at {data?.title || companyInfo?.companyName || "our retreat"}.
            </p>
            <div className="w-full flex flex-col gap-6 lg:w-[90%] mx-auto">
              {rooms.map((room, idx) => {
                  const imageUrls = [
                      ...(room.mainPhoto?.url ? [room.mainPhoto.url] : []),
                      ...(room.relatedPhotos?.length ? room.relatedPhotos.map(photo => photo.url) : [])
                  ];
                  if (imageUrls.length === 0) imageUrls.push('');
                  
                  return (
                      <div key={room._id || idx} className="relative flex flex-col md:flex-row bg-[#f8f5ef] rounded-2xl p-5 md:items-center gap-6 shadow-lg border border-gray-200">
                          {/* Image Carousel */}
                          <div className="relative md:w-[420px] md:h-[290px] h-[250px] py-2 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-gray-100">
                              <Carousel className="w-full h-full" opts={{ loop: true }}>
                                  <CarouselContent>
                                      {imageUrls.map((img, i) => (
                                          <CarouselItem key={i} className="w-full h-full flex items-center justify-center">
                                              {img ? (
                                                  <Image
                                                      src={img}
                                                      alt={room.title || 'Room'}
                                                      width={420}
                                                      height={290}
                                                      className="object-cover w-full h-full rounded-xl"
                                                      priority={i === 0}
                                                  />
                                              ) : (
                                                  <div className="flex w-full h-full items-center justify-center text-muted">
                                                      <Loader2 className="animate-spin mr-2" /> No Image Available
                                                  </div>
                                              )}
                                          </CarouselItem>
                                      ))}
                                  </CarouselContent>
                                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-8" />
                                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-8" />
                              </Carousel>
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1 flex flex-col gap-3 justify-between relative min-h-[260px]">
                              <div>
                                <h3 className="md:text-2xl text-xl font-bold text-gray-900">{room.title || "Room"}</h3>
                                {room.code && <p className="text-xs text-muted mt-1">Code: {room.code}</p>}
                              </div>
                              
                              {room.paragraph && (
                                <div className="text-gray-800 text-sm mb-1" dangerouslySetInnerHTML={{ __html: room.paragraph }} />
                              )}
                              
                              {room.amenities?.length > 0 && (
                                <>
                                  <div className="font-semibold text-gray-800 text-sm mt-1">Room Amenities</div>
                                  <TooltipProvider>
                                      <div className="flex gap-2 flex-wrap mb-2">
                                          {room.amenities.map((am, i) => {
                                              const label = typeof am === 'string' ? am : am.label;
                                              return (
                                              <Tooltip key={i}>
                                                  <TooltipTrigger asChild>
                                                      <span className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center justify-center cursor-default border border-border">
                                                          {label}
                                                      </span>
                                                  </TooltipTrigger>
                                                  <TooltipContent side="top">
                                                      {label}
                                                  </TooltipContent>
                                              </Tooltip>
                                          )})}
                                      </div>
                                  </TooltipProvider>
                                </>
                              )}

                              <div className="flex gap-8 text-sm py-2">
                                  <span>
                                      Single Occupancy: <strong>{formatPrice(room.singleOccupancyPrice)}</strong>
                                  </span>
                                  <span>
                                      Double Occupancy: <strong>{formatPrice(room.doubleOccupancyPrice)}</strong>
                                  </span>
                              </div>

                              <div className="mt-auto pt-4 flex items-center justify-end border-t border-border/50 gap-2">
                                  <Button
                                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-md transition-colors"
                                      onClick={() => {
                                        setSelectedRoom(room);
                                        setBookingOpen(true);
                                      }}
                                  >
                                      Book Room
                                  </Button>
                              </div>
                          </div>
                      </div>
                  );
              })}
            </div>
          </Container>
        </Section>
      ) : null}
      {bookingOpen && selectedRoom ? (
        <BookingDetails hotel={data} room={selectedRoom} onClose={() => {
          setBookingOpen(false);
          setSelectedRoom(null);
        }} />
      ) : null}
    </div>
  );
}
