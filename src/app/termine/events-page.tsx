"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  EVENTS_BY_YEAR_QUERY,
  FUTURE_EVENTS_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";

import type { ALL_EVENTS_QUERYResult } from "@/sanity/types";

type ViewMode = "all" | "future" | "year";

interface EventsPageProps {
  initialEvents: ALL_EVENTS_QUERYResult;
  initialYears: number[];
}

export default function EventsPage({
  initialEvents,
  initialYears,
}: EventsPageProps) {
  const [events, setEvents] = useState<ALL_EVENTS_QUERYResult>(initialEvents);
  const [years, setYears] = useState<number[]>(initialYears);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<
    ALL_EVENTS_QUERYResult[number] | null
  >(null);
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [loading, setLoading] = useState(false);

  const loadFutureEvents = async () => {
    setLoading(true);
    try {
      const { data } = (await sanityFetch({
        query: FUTURE_EVENTS_QUERY,
      })) as { data: ALL_EVENTS_QUERYResult };
      setEvents(data);
      setViewMode("future");
      setSelectedYear(null);
      setSelectedEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const loadEventsByYear = async (year: number) => {
    setLoading(true);
    try {
      const { data } = (await sanityFetch({
        query: EVENTS_BY_YEAR_QUERY,
        params: { year },
      })) as { data: ALL_EVENTS_QUERYResult };
      setEvents(data);
      setViewMode("year");
      setSelectedYear(year);
      setSelectedEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
    const months = [
      "JAN",
      "FEB",
      "MÄR",
      "APR",
      "MAI",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OKT",
      "NOV",
      "DEZ",
    ];

    return {
      dayName: days[date.getDay()],
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
      time: date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatEventTime = (dateString: string | null) =>
    dateString
      ? new Date(dateString).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  // --- Single Event View ---
  if (selectedEvent) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedEvent(null)}
          className="mb-6"
        >
          ← Zurück zur Übersicht
        </Button>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-muted p-4 rounded text-center min-w-[80px]">
              <div className="text-sm font-medium">
                {selectedEvent?.date
                  ? formatDate(selectedEvent.date).dayName
                  : ""}
                .
              </div>
              <div className="text-2xl font-bold">
                {selectedEvent?.date ? formatDate(selectedEvent.date).day : ""}
              </div>
              <div className="text-sm">
                {selectedEvent?.date
                  ? formatDate(selectedEvent.date).month
                  : ""}
              </div>
              <div className="text-sm">
                {selectedEvent?.date ? formatDate(selectedEvent.date).year : ""}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{selectedEvent.title}</h1>
              <p className="text-muted-foreground mb-4">
                {selectedEvent.date && (
                  <span className="font-medium">
                    {formatEventTime(selectedEvent.date)}
                  </span>
                )}
                {selectedEvent.date && selectedEvent.location && " "}
                {selectedEvent.location}
              </p>
              <PortableText
                value={selectedEvent.description || []}
                components={myPortableTextComponents}
              />
              {selectedEvent.flyer && (
                <div className="mt-6">
                  <p className="mb-2">
                    Sie können hier den Flyer herunterladen:
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a
                      href={selectedEvent?.flyer || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DOWNLOAD FLYER
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Events List View ---
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-light text-muted-foreground mb-8">
        Termine
      </h1>

      {/* Navigation */}
      <div className="flex flex-wrap gap-1 mb-8 text-sm">
        <Button
          variant="link"
          onClick={() => {
            setEvents(initialEvents);
            setViewMode("all");
            setSelectedYear(null);
            setSelectedEvent(null);
          }}
          className={cn(
            "p-0 h-auto font-normal text-blue-600 hover:text-blue-800",
            viewMode === "all" && "font-bold"
          )}
        >
          Alle
        </Button>
        <span className="text-muted-foreground">|</span>
        <Button
          variant="link"
          onClick={loadFutureEvents}
          className={cn(
            "p-0 h-auto font-normal text-blue-600 hover:text-blue-800",
            viewMode === "future" && "font-bold"
          )}
        >
          Anstehend
        </Button>
        {years.map((year) => (
          <span key={year} className="flex items-center">
            <span className="text-muted-foreground">|</span>
            <Button
              variant="link"
              onClick={() => loadEventsByYear(year)}
              className={cn(
                "p-0 h-auto font-normal text-blue-600 hover:text-blue-800",
                selectedYear === year && "font-bold"
              )}
            >
              {year}
            </Button>
          </span>
        ))}
      </div>

      {/* Events List */}
      {loading ? (
        <div className="text-center py-8">
          <p>Lade Termine...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Keine Termine gefunden.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {events.map((event) => {
            const dateInfo = formatDate(event.date);
            return (
              <Card
                key={event._id}
                className="p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div
                  className="flex gap-4"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="bg-muted p-4 rounded text-center min-w-[80px]">
                    <div className="text-sm font-medium">
                      {dateInfo.dayName}.
                    </div>
                    <div className="text-2xl font-bold">{dateInfo.day}</div>
                    <div className="text-sm">{dateInfo.month}</div>
                    <div className="text-sm">{dateInfo.year}</div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2 text-blue-600">
                      {event.title}
                    </h2>
                    <p className="text-muted-foreground mb-3">
                      <span className="font-medium">{dateInfo.time}</span>{" "}
                      {event.location}
                    </p>
                    <p className="text-sm line-clamp-3">{event.description}</p>
                    {event.flyer && (
                      <div className="mt-4">
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a
                            href={event.flyer}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DOWNLOAD FLYER
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
