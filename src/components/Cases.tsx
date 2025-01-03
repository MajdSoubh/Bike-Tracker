import React from "react";
import Case from "./Case";

interface BikeData {
  date_stolen: number;
  description: string | null;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string | null;
  location_found: string | null;
  manufacturer_name: string;
  external_id: string | null;
  registry_name: string | null;
  registry_url: string | null;
  serial: string;
  status: "stolen" | "found" | "recovered" | "unknown";
  stolen: boolean;
  stolen_coordinates: [number, number] | null;
  stolen_location: string | null;
  thumb: string | null;
  title: string;
  url: string;
  year: number;
  propulsion_type_slug: "foot-pedal" | "pedal-assist" | string;
  cycle_type_slug: "bike" | "scooter" | "e-bike" | string;
}

interface CasesProps {
  data: BikeData[];
  loading: boolean;
}

const Cases: React.FC<CasesProps> = ({ data = [], loading = false }) => {
  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <Case key={`skeleton-${index}`} loading />
        ))
      ) : data.length > 0 ? (
        data.map((bike) => (
          <Case
            key={bike.id}
            id={bike.id}
            title={bike.title}
            description={bike.description}
            stolenDate={bike.date_stolen}
            stolenLocation={bike.stolen_location}
            primaryColor={bike.frame_colors}
            serial={bike.serial}
            imageURL={bike.thumb}
          />
        ))
      ) : (
        <div className="text-md uppercase text-center">
          No bikes exactly matched your search
        </div>
      )}
    </div>
  );
};

export default Cases;
