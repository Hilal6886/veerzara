import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import logo from "components/Navbars/logo.png";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 20 },
  heading: { fontSize: 18, marginBottom: 10, color: '#2b2b2b' },
  text: { fontSize: 12, marginBottom: 5, color: '#4a4a4a' },
  table: { display: 'table', width: 'auto', margin: '10px 0' },
  tableRow: { flexDirection: 'row' },
  tableCol: { width: '33.33%', borderStyle: 'solid', borderWidth: 1, borderColor: '#bfbfbf', padding: 5 },
  tableCell: { fontSize: 12 },
  footer: { marginTop: 30, textAlign: 'center', fontSize: 12, color: '#4a4a4a' },
  logo: { width: 100, marginBottom: 20, alignSelf: 'center' },
  pdfFooter: { marginTop: 20, fontSize: 10, textAlign: 'center', color: '#4a4a4a' },
});

const TourPackageForm = () => {
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      clientName: '',
      packageIncludes: '',
      packageExcludes: '',
      note: '',
      tourProgram: [{ date: null, programme: '', night: '' }],
      hotelDetails: [{ place: '', hotel: '', checkIn: null, checkOut: null, phone: '' }],
      vehicle: '',
      helpLineNumber: '',
    },
  });

  const { fields: programFields, append: appendProgram, remove: removeProgram } = useFieldArray({
    control,
    name: 'tourProgram',
  });
  const { fields: hotelFields, append: appendHotel, remove: removeHotel } = useFieldArray({
    control,
    name: 'hotelDetails',
  });

  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData(data);
  };

  const CustomDateInput = ({ value, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center"
    >
      <span className="flex-grow text-gray-900">{value || 'Select date'}</span>
      <FaCalendarAlt className="w-5 h-5 text-gray-500 ml-3" />
    </button>
  );

  const TourDocument = ({ data }) => (
    <Document>
      <Page style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <View style={styles.section}>
          <Text style={{ ...styles.heading, textAlign: 'center', fontSize: 24, color: '#2b2b2b' }}>
            KASHMIR CHARMS TOUR AND TRAVELS
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Tour Programme for {data.clientName}:</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Package Includes:</Text>
          <Text style={styles.text}>{data.packageIncludes}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Package Excludes:</Text>
          <Text style={styles.text}>{data.packageExcludes}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Note:</Text>
          <Text style={styles.text}>{data.note}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Tour Program:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Programme</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Night</Text>
              </View>
            </View>
            {data.tourProgram.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.date?.toLocaleDateString()}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.programme}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.night}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Your Hotel:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>No</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Place</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Hotel</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Check In</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Check Out</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Phone No</Text>
              </View>
            </View>
            {data.hotelDetails.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.place}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.hotel}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.checkIn?.toLocaleDateString()}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.checkOut?.toLocaleDateString()}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.phone}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Your Vehicle:</Text>
          <Text style={styles.text}>{data.vehicle}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Help Line Number:</Text>
          <Text style={styles.text}>{data.helpLineNumber}</Text>
        </View>
        <View style={styles.pdfFooter}>
          <Text>KASHMIR CHARMS TOUR AND TRAVELS © 2024. All rights reserved. Contact us at info@kashmircharms.com</Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">KASHMIR CHARMS TOUR AND TRAVELS</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow-lg">
        <div>
          <label className="block text-gray-700 mb-2">Client Name:</label>
          <input {...register('clientName')} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Package Includes:</label>
          <textarea {...register('packageIncludes')} className="w-full p-3 border border-gray-300 rounded-lg" rows="4" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Package Excludes:</label>
          <textarea {...register('packageExcludes')} className="w-full p-3 border border-gray-300 rounded-lg" rows="4" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Note:</label>
          <textarea {...register('note')} className="w-full p-3 border border-gray-300 rounded-lg" rows="4" />
        </div>

        {/* Tour Program Section */}
        <div>
          <label className="block text-gray-700 mb-2">Tour Program:</label>
          {programFields.map((item, index) => (
            <div key={item.id} className="space-y-4 mb-4">
              <div className="relative">
                <DatePicker
                  selected={item.date}
                  onChange={(date) => setValue(`tourProgram.${index}.date`, date, { shouldValidate: true })}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomDateInput />}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Programme:</label>
                <input {...register(`tourProgram.${index}.programme`)} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Night:</label>
                <input {...register(`tourProgram.${index}.night`)} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <button
                type="button"
                onClick={() => removeProgram(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove Program
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendProgram({ date: null, programme: '', night: '' })}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Program
          </button>
        </div>

        {/* Hotel Details Section */}
        <div>
          <label className="block text-gray-700 mb-2">Hotel Details:</label>
          {hotelFields.map((item, index) => (
            <div key={item.id} className="space-y-4 mb-4">
              <div className="relative">
                <DatePicker
                  selected={item.checkIn}
                  onChange={(date) => setValue(`hotelDetails.${index}.checkIn`, date, { shouldValidate: true })}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomDateInput />}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
         
            <input
              type="date"
              id="bookAt"
              name="book_at"
              required
              className="mt-1 p-3 border bg-gradient-to-br from-white to-white shadow-md border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              onChange={(date) => setValue(`hotelDetails.${index}.checkIn`, date, { shouldValidate: true })}
          
            />
          </div>
        
              <div className="relative mt-4">
                <DatePicker
                  selected={item.checkOut}
                  onChange={(date) => setValue(`hotelDetails.${index}.checkOut`, date, { shouldValidate: true })}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomDateInput />}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Place:</label>
                <input {...register(`hotelDetails.${index}.place`)} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Hotel:</label>
                <input {...register(`hotelDetails.${index}.hotel`)} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone:</label>
                <input {...register(`hotelDetails.${index}.phone`)} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <button
                type="button"
                onClick={() => removeHotel(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove Hotel
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendHotel({ place: '', hotel: '', checkIn: null, checkOut: null, phone: '' })}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Hotel
          </button>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Vehicle:</label>
          <input {...register('vehicle')} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Help Line Number:</label>
          <input {...register('helpLineNumber')} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-4 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Generate PDF
        </button>
      </form>

      {formData && (
        <PDFDownloadLink document={<TourDocument data={formData} />} fileName="tour-package.pdf">
          {({ loading }) =>
            loading ? 'Generating PDF...' : (
              <button className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
  
};

export default TourPackageForm;
