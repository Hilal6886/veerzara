import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase configuration file
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DynamicPackagePDF from "../components/DynamicPackagePDF";

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  // Fetch all packages from Firebase
  const fetchPackages = async () => {
    const packagesCollection = collection(db, "packages");
    const snapshot = await getDocs(packagesCollection);
    const packageList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPackages(packageList);
  };

  // Delete a package by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      await deleteDoc(doc(db, "packages", id));
      alert("Package deleted successfully!");
      fetchPackages();
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Travel Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-4 bg-white shadow rounded border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">{pkg.travelerName}</h2>
            <p>
              <strong>Destination:</strong> {pkg.destination || "Kashmir"}
            </p>
            <p>
              <strong>Duration:</strong> {pkg.duration}
            </p>
            <div className="flex items-center gap-3 mt-4">
              {/* Edit Package Button */}
              <Link
                to={`/edit-package/${pkg.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>

              {/* Delete Package Button */}
              <button
                onClick={() => handleDelete(pkg.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>

              {/* Download PDF Button */}
              <PDFDownloadLink
  document={
    <DynamicPackagePDF
      formData={{
        ...pkg,
        itinerary: pkg.itinerary || [], // Ensure it's an array
        hotels: pkg.hotels || [], // Ensure it's an array
        inclusions: pkg.inclusions || "", // Ensure it's a string
        exclusions: pkg.exclusions || "",
        bookingPolicy: pkg.bookingPolicy || "",
        finalNote: pkg.finalNote || "",
        agencyOwner: pkg.agencyOwner || "",
      }}
    />
  }
  fileName={`${pkg.travelerName}_Package.pdf`}
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  {({ loading }) => (loading ? "Loading PDF..." : "Download PDF")}
</PDFDownloadLink>

            </div>
          </div>
        ))}
      </div>
      {packages.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No packages found. Create a new package to get started.
        </p>
      )}
    </div>
  );
};

export default PackageList;
