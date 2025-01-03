import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Skeleton } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface StolenRecord {
  location: string | null;
  locking_description: string | null;
  lock_defeat_description: string | null;
  police_report_number: string | null;
  police_report_department: string | null;
}

interface CaseDetailsProps {
  id: number;
  title: string;
  description: string | null;
  stolenDate: number | null;
  stolenLocation: string | null;
  serial: string | null;
  frameColors: string[];
  manufacturerName: string | null;
  largeImg: string | null;
  frameModel: string | null;
  frameMaterial: string | null;
  frameSize: string | null;
  status: string | null;
  year: number | null;
  stolenRecord: StolenRecord | null;
}

const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState<CaseDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCaseDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://bikeindex.org:443/api/v3/bikes/${id}`
      );
      const result = await response.json();

      if (result.bike) {
        const bike = result.bike;
        const caseData: CaseDetailsProps = {
          id: bike.id,
          title: bike.title,
          description: bike.description,
          stolenDate: bike.date_stolen
            ? new Date(bike.date_stolen * 1000).valueOf()
            : null,
          stolenLocation: bike.stolen_location,
          serial: bike.serial,
          frameColors: bike.frame_colors || [],
          manufacturerName: bike.manufacturer_name,
          largeImg: bike.large_img,
          frameModel: bike.frame_model,
          frameMaterial: bike.frame_material_slug,
          frameSize: bike.frame_size,
          status: bike.status,
          year: bike.year,
          stolenRecord: bike.stolen_record
            ? {
                location: bike.stolen_record.location,
                locking_description: bike.stolen_record.locking_description,
                lock_defeat_description:
                  bike.stolen_record.lock_defeat_description,
                police_report_number: bike.stolen_record.police_report_number,
                police_report_department:
                  bike.stolen_record.police_report_department,
              }
            : null,
        };
        setCaseDetails(caseData);
      } else {
        throw new Error("Case not found");
      }
    } catch (error) {
      notifications.show({
        message:
          "An error occurred while fetching case details. Please try again.",
        position: "top-center",
        color: "red",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  return (
    <div className="pt-12 pb-8 px-4 md:px-8 md:w-[768px] lg:w-[960px] mx-auto">
      <h1 className="text-3xl uppercase mb-8">Case Details</h1>

      {loading && (
        <div className="flex flex-col gap-6">
          <Skeleton height={200} radius="xl" />
          <Skeleton height={20} width="80%" radius="xl" />
          <Skeleton height={20} width="60%" radius="xl" />
          <Skeleton height={20} width="40%" radius="xl" />
        </div>
      )}
      {!loading && caseDetails && (
        <div className="flex flex-col gap-6">
          {/* Image */}
          <div className="rounded-lg overflow-hidden w-full max-h-[400px]">
            {caseDetails.largeImg ? (
              <img
                src={caseDetails.largeImg}
                alt="Bike"
                className="w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center h-[400px]">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Case Information */}
          <div>
            <h2 className="text-xl font-bold mb-2">{caseDetails.title}</h2>
            <p>
              <strong>Manufacturer:</strong>{" "}
              {caseDetails.manufacturerName || "Unknown"}
            </p>
            <p>
              <strong>Frame Model:</strong>{" "}
              {caseDetails.frameModel || "Unknown"}
            </p>
            <p>
              <strong>Frame Material:</strong>{" "}
              {caseDetails.frameMaterial || "Unknown"}
            </p>
            <p>
              <strong>Frame Size:</strong> {caseDetails.frameSize || "Unknown"}
            </p>
            <p>
              <strong>Year:</strong> {caseDetails.year || "Unknown"}
            </p>
            <p>
              <strong>Status:</strong> {caseDetails.status || "Unknown"}
            </p>
            <p>
              <strong>Stolen Location:</strong>{" "}
              {caseDetails.stolenLocation || "Unknown"}
            </p>
            <p>
              <strong>Stolen Date:</strong>{" "}
              {caseDetails.stolenDate
                ? new Date(caseDetails.stolenDate).toLocaleString()
                : "Unknown"}
            </p>
            <p>
              <strong>Serial Number:</strong>{" "}
              {caseDetails.serial || "Not Available"}
            </p>
            {caseDetails.frameColors.length > 0 && (
              <p>
                <strong>Frame Colors:</strong>{" "}
                {caseDetails.frameColors.join(", ")}
              </p>
            )}
            {caseDetails.stolenRecord && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Theft Details</h3>
                <p>
                  <strong>Police Report Number:</strong>{" "}
                  {caseDetails.stolenRecord.police_report_number || "Unknown"}
                </p>
                <p>
                  <strong>Police Department:</strong>{" "}
                  {caseDetails.stolenRecord.police_report_department ||
                    "Unknown"}
                </p>
                <p>
                  <strong>Locking Description:</strong>{" "}
                  {caseDetails.stolenRecord.locking_description || "Unknown"}
                </p>
                <p>
                  <strong>Lock Defeat Description:</strong>{" "}
                  {caseDetails.stolenRecord.lock_defeat_description ||
                    "Unknown"}
                </p>
              </div>
            )}
            {caseDetails.description && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Description</h3>
                <p>{caseDetails.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Back to Home Button */}
      <button
        className="mt-6 py-2 px-4 bg-slate-500 text-white rounded hover:bg-slate-600 transition-all"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default CaseDetails;
