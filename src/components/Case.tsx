import React from "react";
import { Skeleton } from "@mantine/core";
import { format } from "date-fns";
import Card from "./partials/Card";

interface CaseProps {
  title?: string;
  description?: string | null;
  stolenDate?: number | null;
  serial?: string;
  primaryColor?: string[];
  stolenLocation?: string | null;
  imageURL?: string | null;
  loading?: boolean;
}

const Case: React.FC<CaseProps> = ({
  title,
  description = null,
  stolenDate = null,
  serial = null,
  primaryColor = [],
  stolenLocation = null,
  imageURL = null,
  loading = false,
}) => {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
        {/* Image */}
        <div className="flex items-center order-1 self-center sm:self-start rounded-xl overflow-hidden w-[186px] min-w-[186px] h-[186px]">
          {!loading && (
            <>
              {imageURL ? (
                <img
                  width="100%"
                  className="rounded-md"
                  height="100%"
                  src={imageURL}
                  alt="Bike"
                />
              ) : (
                <svg
                  width="100%"
                  height="100%"
                  className="p-4 bg-[#F2F2F2]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 75.45 75.45"
                >
                  <g fill="#fff">
                    <path d="m14 61.71a14 14 0 1 1 14-14 14 14 0 0 1 -14 14zm0-25a11 11 0 1 0 11 11 11 11 0 0 0 -11-11z" />
                    <path d="m61.45 61.71a14 14 0 1 1 14-14 14 14 0 0 1 -14 14zm0-25a11 11 0 1 0 11 11 11 11 0 0 0 -11-11z" />
                    <path d="m35.22 49.22h-21.22a1.5 1.5 0 0 1 -1.13-2.48l13.35-15.4-3.59-8a1.5 1.5 0 0 1 2.74-1.23l3.44 7.65 23.35-7.15a1.5 1.5 0 0 1 1.65 2.32l-17.36 23.65a1.49 1.49 0 0 1 -.84.53h-.33zm-17.95-3h15.63l-5.34-11.87zm12.73-13.69 5.5 12.23 13.19-17.94z" />
                    <path d="m30.23 24.23h-10a1.5 1.5 0 0 1 0-3h10a1.5 1.5 0 0 1 0 3z" />
                    <path d="m61.45 49.22a1.5 1.5 0 0 1 -1.4-1l-11.24-30a1.5 1.5 0 0 1 .88-1.93h.05l7.49-2.5a1.5 1.5 0 1 1 .95 2.85l-6 2 10.69 28.5a1.5 1.5 0 0 1 -1.42 2.08z" />
                  </g>
                </svg>
              )}
            </>
          )}
          {loading && (
            <Skeleton
              height={"186px"}
              width={"186px"}
              mt={6}
              radius="0.75rem"
            />
          )}
        </div>
        {/* Title & Meta Data */}
        <div className="order-2 sm:order-1 mt-2 grow">
          {!loading && (
            <>
              {/* Title */}
              <h3 className="text-md max-sm:text-center font-bold">{title}</h3>
              {/* Meta Data */}
              <div className="block sm:flex justify-between gap-2 mt-2">
                {(description || stolenLocation) && (
                  <div className="block sm:flex flex-col items-start gap-2">
                    {stolenLocation && (
                      <div>Stolen Location: {stolenLocation}</div>
                    )}
                  </div>
                )}
                {(stolenDate || serial || primaryColor.length > 0) && (
                  <div className="block sm:flex flex-col items-start gap-2">
                    {stolenDate && (
                      <div>
                        Stolen Date: {format(stolenDate, "yyyy-MM-dd hh:mm aa")}
                      </div>
                    )}
                    {serial && <div>Serial: {serial}</div>}
                    {primaryColor.length > 0 && (
                      <div className="flex flex-wrap">
                        <span>Primary Colors:&nbsp;</span>
                        {primaryColor.map((color) => (
                          <span key={color + Math.random() * 100}>
                            {color},&nbsp;
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Description */}
              {description && (
                <div className="mt-2 text-ellipsis overflow-hidden line-clamp-3 ">
                  <span className="font-bold block text-sm">Description</span>
                  {description}
                </div>
              )}
            </>
          )}
          {loading && (
            <div className="w-full flex items-center sm:items-start flex-col gap-5">
              <Skeleton height={8} w="90px" mt={6} radius="xl" />
              <Skeleton height={8} w="80%" radius="xl" />
              <Skeleton height={8} w="90%" radius="xl" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Case;
