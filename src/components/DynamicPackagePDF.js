import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "components/Navbars/logo.png";
import cover from "components/Navbars/cover.jpg";

// Register custom fonts
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5Q.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2px solid #4CAF50",
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 85,
  },
  agencyDetails: {
    textAlign: "right",
  },
  agencyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  agencySlogan: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#555",
  },
  coverImage: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#023020",
    color: "white",
    textAlign: "center",
    padding: 5,
    border:"none",
    borderRadius: 5,
    marginBottom: 15,
    textTransform: "uppercase",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginBottom: 20,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  tableRowHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 6,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  itineraryDay: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#FFEB3B",
    borderRadius: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
  },
  sightseeing: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  note: {
    fontSize: 12,
    color: "red",
    fontStyle: "italic",
    marginTop: 5,
  },
  finalMessage: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  footer: {
    marginTop: 20,
    borderTop: "2px solid #4CAF50",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
  policySection: {
    marginTop: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  policyDescription: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#333",
  },
});

const DynamicPackagePDF = ({ formData }) => {
  const {
    travelerName = "N/A",
    destination = "Kashmir",
    checkInDate = "N/A",
    checkOutDate = "N/A",
    duration = "N/A",
    itinerary = [],
    hotels = [],
    inclusions = "N/A",
    exclusions = "N/A",
    bookingPolicy = "N/A",
    finalNote = "",
    totalAmount = "N/A",
  } = formData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <View style={styles.agencyDetails}>
            <Text style={styles.agencyName}>Kashmir Charms Tour and Travels</Text>
            <Text style={styles.agencySlogan}>
              Making every journey a memory to cherish
            </Text>
          </View>
        </View>

        {/* Cover Image */}
        <Image style={styles.coverImage} src={cover} />

        {/* Package Details */}
        <Text style={styles.sectionTitle}>Package Details</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableRowHeader]}>
            <Text style={styles.tableCell}>Details</Text>
            <Text style={styles.tableCell}>Values</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Traveler Name</Text>
            <Text style={styles.tableCell}>{travelerName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Destination</Text>
            <Text style={styles.tableCell}>{destination}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Check-In Date</Text>
            <Text style={styles.tableCell}>{checkInDate}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Check-Out Date</Text>
            <Text style={styles.tableCell}>{checkOutDate}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Duration</Text>
            <Text style={styles.tableCell}>{duration}</Text>
          </View>
        </View>

        {/* Itinerary */}
        <Text style={styles.sectionTitle}>Itinerary</Text>
        {itinerary.map((day, index) => (
          <View key={index}>
            <Text style={styles.itineraryDay}>
              {day.dayTitle || `Day ${index + 1}`}
            </Text>
            <Text style={styles.description}>{day.description}</Text>
            <Text style={styles.sightseeing}>
              Famous Sightseeing: 
              {"\n"}
              {day.sightseeing}
            </Text>
            {day.note && <Text style={styles.note}>Note: {day.note}</Text>}
          </View>
        ))}

        {/* Proposed Hotels */}
        <Text style={styles.sectionTitle}>Proposed Hotels</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableRowHeader]}>
            <Text style={styles.tableCell}>Star Rating</Text>
            <Text style={styles.tableCell}>Location</Text>
            <Text style={styles.tableCell}>Duration</Text>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Room Type</Text>
          </View>
          {hotels.map((hotel, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{hotel.stars}</Text>
              <Text style={styles.tableCell}>{hotel.location}</Text>
              <Text style={styles.tableCell}>{hotel.nights}</Text>
              <Text style={styles.tableCell}>{hotel.name}</Text>
              <Text style={styles.tableCell}>{hotel.roomType}</Text>

            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total</Text>
            <Text style={styles.tableCell}>{totalAmount}</Text>
          </View>
        </View>

        {/* Inclusions */}
        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Inclusions</Text>
          <Text style={styles.policyDescription}>{inclusions}</Text>
        </View>

        {/* Exclusions */}
        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Exclusions</Text>
          <Text style={styles.policyDescription}>{exclusions}</Text>
        </View>

        {/* Booking Policy */}
        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Booking Policy</Text>
          <Text style={styles.policyDescription}>{bookingPolicy}</Text>
        </View>

        {/* Final Note */}
        <Text style={styles.finalMessage}>{finalNote}</Text>

        {/* Footer */}
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerDetails}>
            Location: Sheikhpora Budgam Near DPS Road Opp Almas Prov. Store
            {"\n"}Pincode: 191111
          </Text>
          <Text style={styles.footerDetails}>
            Phone No: +917006522744 |Phone No: +918825086023
          </Text>
          <Text style={styles.footerDetails}>
            Email: kashmircharms@gmail.com | Website: www.kashmircharms.com
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DynamicPackagePDF;
