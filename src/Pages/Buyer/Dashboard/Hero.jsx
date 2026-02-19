import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaHeart,
  FaCalendarAlt,
  FaFileAlt,
  FaFilter,
  FaMapMarkedAlt,
} from "react-icons/fa";
import filtericon from "../../../../public/filter.png";
import { FaHouse } from "react-icons/fa6";
import { fetchDashboardStats } from "../../../Redux/DashboardStats";
import { fetchInspections } from "../../../Redux/BookInspection";
import { fetchProperties } from "../../../Redux/GetProperty";
import { fetchFilteredProperties } from "../../../Redux/Filter";
import PropertyCard from "../PropertyCard";
import FilterModal from "../../../Components/FilterModal";

function Hero() {
  const [user, setUser] = useState("User");
  const [savedCount, setSavedCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [notifications] = useState(3);
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [inspectionBookings, setInspectionBookings] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showInspections, setShowInspections] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilterResults, setShowFilterResults] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.full_name || "User");
    }

    loadDashboardStats();
    loadAllProperties();
  }, []);

  const loadAllProperties = async () => {
    try {
      const properties = await fetchProperties();
      setAllProperties(properties || []);
    } catch (err) {
      console.error("Error loading all properties:", err);
    }
  };

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const stats = await fetchDashboardStats();
      setSavedCount(stats.total_bookmarks || 0);
      setBookingsCount(stats.total_inspections || 0);
      setReportsCount(stats.total_properties || 0);
      setBookmarkedProperties(stats.bookmarked_properties || []);
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowInspections = async () => {
    if (!showInspections) {
      try {
        const inspections = await fetchInspections();
        setInspectionBookings(inspections || []);
      } catch (err) {
        console.error("Error loading inspections:", err);
      }
    }
    setShowInspections(!showInspections);
    setShowBookmarks(false);
    setShowSearch(false);
  };

  const handleShowBookmarks = () => {
    setShowBookmarks(!showBookmarks);
    setShowInspections(false);
    setShowSearch(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    // Search through properties
    const filtered = allProperties.filter((property) => {
      const searchLower = query.toLowerCase();
      return (
        property.propertyName?.toLowerCase().includes(searchLower) ||
        property.propertyAddress?.toLowerCase().includes(searchLower) ||
        property.id?.toLowerCase().includes(searchLower) ||
        property.slug?.toLowerCase().includes(searchLower)
      );
    });

    setSearchResults(filtered);
    setShowSearch(true);
    setShowBookmarks(false);
    setShowInspections(false);
  };

  const formatInspectionDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatInspectionTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleApplyFilters = async (filters) => {
    try {
      setLoading(true);
      setActiveFilters(filters);

      // If no filters are applied, show all properties
      if (Object.keys(filters).length === 0) {
        setShowFilterResults(false);
        setFilteredProperties([]);
        setShowBookmarks(false);
        setShowInspections(false);
        setShowSearch(false);
        return;
      }

      const properties = await fetchFilteredProperties(filters);
      setFilteredProperties(properties || []);
      setShowFilterResults(true);
      setShowBookmarks(false);
      setShowInspections(false);
      setShowSearch(false);
    } catch (err) {
      console.error("Error applying filters:", err);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0a2a47] to-[#133a5c] pb-10 px-4 sm:px-8 pt-8 relative">
      <section className="max-w-7xl mx-auto items-center">
        {/* Notification bell */}
        <div className="absolute top-6 right-10">
          {/* <button className="relative">
            <FaBell className="text-white text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white">
              {notifications}
            </span>
          </button> */}
        </div>
        {/* Welcome */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Welcome back, {user} <span className="inline-block">👋</span>
        </h1>
        <div className="text-slate-200 text-sm sm:text-base mb-7">
          Find your next home with trusted inspection details
        </div>

        {/* Search bar and actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 max-w-full">
          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Search by suburb, city or property ID..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-lg py-2 sm:py-3 pl-5 pr-12 text-sm sm:text-base bg-transparent border border-white text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18aa99]"
            />
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 bg-[#223a5c] text-white px-5 py-3 rounded-lg text-base hover:bg-[#1a2e4a] w-full sm:w-auto mt-3 sm:mt-0 justify-center"
          >
            <img src={filtericon} alt="Filters" className="w-5 h-5" /> Filters
            {Object.keys(activeFilters).length > 0 && (
              <span className="bg-[#18aa99] text-white text-xs font-bold rounded-full px-2 py-0.5">
                {Object.keys(activeFilters).length}
              </span>
            )}
          </button>
        </div>

        {/* Dashboard cards */}
        <div className="flex flex-col sm:flex-row gap-6 max-w-7xl mx-auto">
          {/* Saved Properties */}
          <button
            onClick={handleShowBookmarks}
            className="w-full sm:flex-1 bg-white/10 rounded-2xl px-5 sm:px-7 py-4 sm:py-6 flex items-center gap-4 relative sm:min-w-[220px] hover:bg-white/20 transition cursor-pointer"
          >
            <div className="bg-[#18aa99] bg-opacity-20 p-3 rounded-lg">
              <FaHeart className="text-[#18aa99] text-2xl" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Saved Properties
              </div>
            </div>
            <span className="absolute top-4 right-5 bg-[#18aa99] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {savedCount}
            </span>
          </button>
          {/* Inspection Bookings */}
          <button
            onClick={handleShowInspections}
            className="w-full sm:flex-1 bg-white/10 rounded-2xl px-5 sm:px-7 py-4 sm:py-6 flex items-center gap-4 relative sm:min-w-[220px] hover:bg-white/20 transition cursor-pointer"
          >
            <div className="bg-[#fbbf24] bg-opacity-20 p-3 rounded-lg">
              <FaCalendarAlt className="text-[#fbbf24] text-2xl" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Inspection Bookings
              </div>
            </div>
            <span className="absolute top-4 right-5 bg-[#fbbf24] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {bookingsCount}
            </span>
          </button>
          {/* Downloaded Reports */}
          <div className="w-full sm:flex-1 bg-white/10 rounded-2xl px-5 sm:px-7 py-4 sm:py-6 flex items-center gap-4 relative sm:min-w-[220px]">
            <div className="bg-[#2563eb] bg-opacity-20 p-3 rounded-lg">
              <FaHouse className="text-[#2563eb] text-2xl" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Total Available Properties
              </div>
            </div>
            <span className="absolute top-4 right-5 bg-[#2563eb] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {reportsCount}
            </span>
          </div>
        </div>

        {/* Search Results Section */}
        {showSearch && (
          <div className="mt-8 bg-white rounded-2xl p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                Search Results
                {searchResults.length > 0 && (
                  <span className="text-lg text-slate-500 ml-2">
                    ({searchResults.length} found)
                  </span>
                )}
              </h3>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="text-slate-500 hover:text-slate-700 text-sm font-semibold"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="text-lg">No properties found</p>
                <p className="text-sm mt-2">
                  Try searching with different keywords
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <PropertyCard
                    key={property.id}
                    propertyId={property.id}
                    slug={property.slug}
                    title={property.propertyName}
                    address={property.propertyAddress}
                    imageUrl={property.propertyFeatureImage}
                    beds={property.propertyBedrooms}
                    baths={property.propertyBathrooms}
                    cars={property.propertyParking}
                    built={property.propertyBuildYear}
                    badges={[
                      property.total_inspection_reports > 0 &&
                        "Inspection Report Ready",
                      !property.is_unlocked ? "Locked" : "Unlocked",
                    ].filter(Boolean)}
                    favorite={property.is_bookmarked}
                    isLocked={!property.is_unlocked}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Filter Results Section */}
        {showFilterResults && (
          <div className="mt-8 bg-white rounded-2xl p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                Filtered Properties
                {filteredProperties.length > 0 && (
                  <span className="text-lg text-slate-500 ml-2">
                    ({filteredProperties.length} found)
                  </span>
                )}
              </h3>
              <button
                onClick={() => {
                  setShowFilterResults(false);
                  setActiveFilters({});
                  setFilteredProperties([]);
                }}
                className="text-slate-500 hover:text-slate-700 text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="text-lg">No properties found</p>
                <p className="text-sm mt-2">
                  Try adjusting your filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    propertyId={property.id}
                    slug={property.slug}
                    title={property.propertyName}
                    address={property.propertyAddress}
                    imageUrl={property.propertyFeatureImage}
                    beds={property.propertyBedrooms}
                    baths={property.propertyBathrooms}
                    cars={property.propertyParking}
                    built={property.propertyBuildYear}
                    badges={[
                      property.total_inspection_reports > 0 &&
                        "Inspection Report Ready",
                      !property.is_unlocked ? "Locked" : "Unlocked",
                    ].filter(Boolean)}
                    favorite={property.is_bookmarked}
                    isLocked={!property.is_unlocked}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookmarked Properties Section */}
        {showBookmarks && (
          <div className="mt-8 bg-white rounded-2xl p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                Saved Properties
              </h3>
              <button
                onClick={() => setShowBookmarks(false)}
                className="text-slate-500 hover:text-slate-700 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            {bookmarkedProperties.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <FaHeart className="text-5xl mx-auto mb-4 text-slate-300" />
                <p className="text-lg">No saved properties yet</p>
                <p className="text-sm mt-2">
                  Click the heart icon on properties to save them here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    propertyId={property.id}
                    slug={property.slug}
                    title={property.propertyName}
                    address={property.propertyAddress}
                    imageUrl={property.propertyFeatureImage}
                    beds={property.propertyBedrooms}
                    baths={property.propertyBathrooms}
                    cars={property.propertyParking}
                    built={property.propertyBuildYear}
                    badges={[
                      property.total_inspection_reports > 0 &&
                        "Inspection Report Ready",
                      !property.is_unlocked ? "Locked" : "Unlocked",
                    ].filter(Boolean)}
                    favorite={property.is_bookmarked}
                    isLocked={!property.is_unlocked}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inspection Bookings Section */}
        {showInspections && (
          <div className="mt-8 bg-white rounded-2xl p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                Inspection Bookings
              </h3>
              <button
                onClick={() => setShowInspections(false)}
                className="text-slate-500 hover:text-slate-700 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            {inspectionBookings.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <FaCalendarAlt className="text-5xl mx-auto mb-4 text-slate-300" />
                <p className="text-lg">No inspection bookings yet</p>
                <p className="text-sm mt-2">
                  Book an inspection on a property to see it here
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {inspectionBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-slate-50 rounded-xl p-6 flex flex-col lg:flex-row gap-6 items-start"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={booking.property.propertyFeatureImage}
                        alt={booking.property.propertyName}
                        className="w-full lg:w-64 h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-800 mb-2">
                        {booking.property.propertyName}
                      </h4>
                      <p className="text-slate-600 mb-4">
                        {booking.property.propertyAddress}
                      </p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="text-slate-700">
                          🛏️ {booking.property.propertyBedrooms} beds
                        </span>
                        <span className="text-slate-700">
                          🛁 {booking.property.propertyBathrooms} baths
                        </span>
                        <span className="text-slate-700">
                          🚗 {booking.property.propertyParking} cars
                        </span>
                      </div>
                      <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <FaCalendarAlt className="text-amber-600 text-2xl" />
                        <div>
                          <div className="font-semibold text-slate-800">
                            Inspection Scheduled
                          </div>
                          <div className="text-slate-600">
                            {formatInspectionDate(booking.inspection_datetime)}{" "}
                            at{" "}
                            {formatInspectionTime(booking.inspection_datetime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}

export default Hero;
