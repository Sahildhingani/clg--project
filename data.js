const indiaAirQualityData = {
  country: "India",
  unit: "ug/m3",
  years: [2023, 2024, 2025],
  pollutants: ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3"],
  states: [
    {
      name: "Andhra Pradesh",
      districts: [
        {
          name: "Visakhapatnam",
          data: {
            2023: { "PM2.5": 45, PM10: 88, NO2: 28, SO2: 12, CO: 0.8, O3: 42 },
            2024: { "PM2.5": 42, PM10: 82, NO2: 27, SO2: 11, CO: 0.76, O3: 44 },
            2025: { "PM2.5": 39, PM10: 78, NO2: 25, SO2: 10, CO: 0.72, O3: 46 }
          }
        },
        {
          name: "Vijayawada",
          data: {
            2023: { "PM2.5": 52, PM10: 98, NO2: 31, SO2: 13, CO: 0.86, O3: 40 },
            2024: { "PM2.5": 49, PM10: 94, NO2: 30, SO2: 12, CO: 0.82, O3: 42 },
            2025: { "PM2.5": 46, PM10: 89, NO2: 28, SO2: 11, CO: 0.79, O3: 44 }
          }
        }
      ]
    },
    {
      name: "Arunachal Pradesh",
      districts: [
        {
          name: "Papum Pare",
          data: {
            2023: { "PM2.5": 22, PM10: 44, NO2: 14, SO2: 7, CO: 0.48, O3: 34 },
            2024: { "PM2.5": 21, PM10: 42, NO2: 13, SO2: 7, CO: 0.46, O3: 35 },
            2025: { "PM2.5": 20, PM10: 40, NO2: 12, SO2: 6, CO: 0.44, O3: 36 }
          }
        },
        {
          name: "Changlang",
          data: {
            2023: { "PM2.5": 24, PM10: 47, NO2: 15, SO2: 8, CO: 0.5, O3: 33 },
            2024: { "PM2.5": 23, PM10: 45, NO2: 14, SO2: 7, CO: 0.48, O3: 34 },
            2025: { "PM2.5": 21, PM10: 43, NO2: 13, SO2: 7, CO: 0.46, O3: 35 }
          }
        }
      ]
    },
    {
      name: "Assam",
      districts: [
        {
          name: "Kamrup Metropolitan",
          data: {
            2023: { "PM2.5": 41, PM10: 80, NO2: 24, SO2: 10, CO: 0.73, O3: 39 },
            2024: { "PM2.5": 39, PM10: 76, NO2: 23, SO2: 9, CO: 0.7, O3: 40 },
            2025: { "PM2.5": 37, PM10: 72, NO2: 22, SO2: 9, CO: 0.67, O3: 41 }
          }
        },
        {
          name: "Dibrugarh",
          data: {
            2023: { "PM2.5": 36, PM10: 71, NO2: 20, SO2: 9, CO: 0.66, O3: 37 },
            2024: { "PM2.5": 34, PM10: 68, NO2: 19, SO2: 8, CO: 0.64, O3: 38 },
            2025: { "PM2.5": 32, PM10: 65, NO2: 18, SO2: 8, CO: 0.61, O3: 39 }
          }
        }
      ]
    },
    {
      name: "Bihar",
      districts: [
        {
          name: "Patna",
          data: {
            2023: { "PM2.5": 88, PM10: 162, NO2: 42, SO2: 17, CO: 1.2, O3: 31 },
            2024: { "PM2.5": 82, PM10: 153, NO2: 40, SO2: 16, CO: 1.15, O3: 33 },
            2025: { "PM2.5": 76, PM10: 145, NO2: 38, SO2: 15, CO: 1.08, O3: 35 }
          }
        },
        {
          name: "Gaya",
          data: {
            2023: { "PM2.5": 74, PM10: 142, NO2: 36, SO2: 15, CO: 1.03, O3: 32 },
            2024: { "PM2.5": 69, PM10: 134, NO2: 34, SO2: 14, CO: 0.99, O3: 34 },
            2025: { "PM2.5": 64, PM10: 127, NO2: 32, SO2: 13, CO: 0.94, O3: 36 }
          }
        }
      ]
    },
    {
      name: "Chhattisgarh",
      districts: [
        {
          name: "Raipur",
          data: {
            2023: { "PM2.5": 57, PM10: 110, NO2: 30, SO2: 14, CO: 0.9, O3: 41 },
            2024: { "PM2.5": 53, PM10: 104, NO2: 29, SO2: 13, CO: 0.86, O3: 43 },
            2025: { "PM2.5": 49, PM10: 98, NO2: 27, SO2: 12, CO: 0.82, O3: 45 }
          }
        },
        {
          name: "Bilaspur",
          data: {
            2023: { "PM2.5": 51, PM10: 101, NO2: 27, SO2: 13, CO: 0.84, O3: 40 },
            2024: { "PM2.5": 48, PM10: 96, NO2: 26, SO2: 12, CO: 0.8, O3: 42 },
            2025: { "PM2.5": 45, PM10: 91, NO2: 24, SO2: 11, CO: 0.77, O3: 44 }
          }
        }
      ]
    },
    {
      name: "Goa",
      districts: [
        {
          name: "North Goa",
          data: {
            2023: { "PM2.5": 28, PM10: 56, NO2: 19, SO2: 8, CO: 0.58, O3: 46 },
            2024: { "PM2.5": 27, PM10: 54, NO2: 18, SO2: 8, CO: 0.56, O3: 47 },
            2025: { "PM2.5": 25, PM10: 51, NO2: 17, SO2: 7, CO: 0.54, O3: 48 }
          }
        },
        {
          name: "South Goa",
          data: {
            2023: { "PM2.5": 26, PM10: 52, NO2: 17, SO2: 7, CO: 0.55, O3: 45 },
            2024: { "PM2.5": 25, PM10: 50, NO2: 16, SO2: 7, CO: 0.53, O3: 46 },
            2025: { "PM2.5": 24, PM10: 48, NO2: 15, SO2: 6, CO: 0.51, O3: 47 }
          }
        }
      ]
    },
    {
      name: "Gujarat",
      districts: [
        {
          name: "Ahmedabad",
          data: {
            2023: { "PM2.5": 61, PM10: 118, NO2: 34, SO2: 15, CO: 0.95, O3: 43 },
            2024: { "PM2.5": 57, PM10: 112, NO2: 32, SO2: 14, CO: 0.91, O3: 45 },
            2025: { "PM2.5": 53, PM10: 106, NO2: 30, SO2: 13, CO: 0.87, O3: 47 }
          }
        },
        {
          name: "Surat",
          data: {
            2023: { "PM2.5": 55, PM10: 108, NO2: 31, SO2: 14, CO: 0.89, O3: 42 },
            2024: { "PM2.5": 52, PM10: 102, NO2: 29, SO2: 13, CO: 0.85, O3: 44 },
            2025: { "PM2.5": 49, PM10: 97, NO2: 27, SO2: 12, CO: 0.81, O3: 46 }
          }
        }
      ]
    },
    {
      name: "Haryana",
      districts: [
        {
          name: "Gurugram",
          data: {
            2023: { "PM2.5": 92, PM10: 170, NO2: 48, SO2: 18, CO: 1.28, O3: 34 },
            2024: { "PM2.5": 86, PM10: 160, NO2: 45, SO2: 17, CO: 1.21, O3: 36 },
            2025: { "PM2.5": 80, PM10: 151, NO2: 42, SO2: 16, CO: 1.14, O3: 38 }
          }
        },
        {
          name: "Faridabad",
          data: {
            2023: { "PM2.5": 84, PM10: 157, NO2: 44, SO2: 17, CO: 1.18, O3: 35 },
            2024: { "PM2.5": 79, PM10: 148, NO2: 41, SO2: 16, CO: 1.12, O3: 37 },
            2025: { "PM2.5": 74, PM10: 140, NO2: 39, SO2: 15, CO: 1.06, O3: 39 }
          }
        }
      ]
    },
    {
      name: "Himachal Pradesh",
      districts: [
        {
          name: "Shimla",
          data: {
            2023: { "PM2.5": 27, PM10: 53, NO2: 16, SO2: 7, CO: 0.56, O3: 39 },
            2024: { "PM2.5": 26, PM10: 51, NO2: 15, SO2: 6, CO: 0.54, O3: 40 },
            2025: { "PM2.5": 24, PM10: 48, NO2: 14, SO2: 6, CO: 0.51, O3: 41 }
          }
        },
        {
          name: "Kangra",
          data: {
            2023: { "PM2.5": 29, PM10: 57, NO2: 17, SO2: 8, CO: 0.59, O3: 38 },
            2024: { "PM2.5": 27, PM10: 54, NO2: 16, SO2: 7, CO: 0.56, O3: 39 },
            2025: { "PM2.5": 26, PM10: 51, NO2: 15, SO2: 7, CO: 0.54, O3: 40 }
          }
        }
      ]
    },
    {
      name: "Jharkhand",
      districts: [
        {
          name: "Ranchi",
          data: {
            2023: { "PM2.5": 63, PM10: 122, NO2: 33, SO2: 14, CO: 0.96, O3: 37 },
            2024: { "PM2.5": 59, PM10: 115, NO2: 31, SO2: 13, CO: 0.91, O3: 39 },
            2025: { "PM2.5": 55, PM10: 109, NO2: 29, SO2: 12, CO: 0.87, O3: 41 }
          }
        },
        {
          name: "Dhanbad",
          data: {
            2023: { "PM2.5": 71, PM10: 136, NO2: 36, SO2: 16, CO: 1.02, O3: 36 },
            2024: { "PM2.5": 67, PM10: 129, NO2: 34, SO2: 15, CO: 0.98, O3: 38 },
            2025: { "PM2.5": 62, PM10: 122, NO2: 32, SO2: 14, CO: 0.93, O3: 40 }
          }
        }
      ]
    },
    {
      name: "Karnataka",
      districts: [
        {
          name: "Bengaluru Urban",
          data: {
            2023: { "PM2.5": 43, PM10: 84, NO2: 30, SO2: 11, CO: 0.79, O3: 45 },
            2024: { "PM2.5": 40, PM10: 79, NO2: 28, SO2: 10, CO: 0.75, O3: 47 },
            2025: { "PM2.5": 37, PM10: 74, NO2: 26, SO2: 9, CO: 0.71, O3: 49 }
          }
        },
        {
          name: "Mysuru",
          data: {
            2023: { "PM2.5": 35, PM10: 69, NO2: 22, SO2: 9, CO: 0.67, O3: 44 },
            2024: { "PM2.5": 33, PM10: 65, NO2: 21, SO2: 8, CO: 0.64, O3: 46 },
            2025: { "PM2.5": 31, PM10: 62, NO2: 20, SO2: 8, CO: 0.62, O3: 48 }
          }
        }
      ]
    },
    {
      name: "Kerala",
      districts: [
        {
          name: "Thiruvananthapuram",
          data: {
            2023: { "PM2.5": 29, PM10: 58, NO2: 20, SO2: 8, CO: 0.6, O3: 47 },
            2024: { "PM2.5": 27, PM10: 55, NO2: 19, SO2: 8, CO: 0.58, O3: 49 },
            2025: { "PM2.5": 25, PM10: 52, NO2: 18, SO2: 7, CO: 0.55, O3: 50 }
          }
        },
        {
          name: "Kochi",
          data: {
            2023: { "PM2.5": 31, PM10: 61, NO2: 21, SO2: 9, CO: 0.62, O3: 46 },
            2024: { "PM2.5": 29, PM10: 58, NO2: 20, SO2: 8, CO: 0.6, O3: 48 },
            2025: { "PM2.5": 27, PM10: 55, NO2: 19, SO2: 8, CO: 0.57, O3: 49 }
          }
        }
      ]
    },
    {
      name: "Madhya Pradesh",
      districts: [
        {
          name: "Bhopal",
          data: {
            2023: { "PM2.5": 56, PM10: 108, NO2: 29, SO2: 13, CO: 0.88, O3: 40 },
            2024: { "PM2.5": 52, PM10: 102, NO2: 27, SO2: 12, CO: 0.84, O3: 42 },
            2025: { "PM2.5": 48, PM10: 96, NO2: 25, SO2: 11, CO: 0.8, O3: 44 }
          }
        },
        {
          name: "Indore",
          data: {
            2023: { "PM2.5": 59, PM10: 113, NO2: 31, SO2: 14, CO: 0.91, O3: 39 },
            2024: { "PM2.5": 55, PM10: 107, NO2: 29, SO2: 13, CO: 0.87, O3: 41 },
            2025: { "PM2.5": 51, PM10: 101, NO2: 27, SO2: 12, CO: 0.83, O3: 43 }
          }
        }
      ]
    },
    {
      name: "Maharashtra",
      districts: [
        {
          name: "Mumbai Suburban",
          data: {
            2023: { "PM2.5": 46, PM10: 90, NO2: 35, SO2: 12, CO: 0.82, O3: 45 },
            2024: { "PM2.5": 43, PM10: 85, NO2: 33, SO2: 11, CO: 0.78, O3: 47 },
            2025: { "PM2.5": 40, PM10: 80, NO2: 31, SO2: 10, CO: 0.74, O3: 49 }
          }
        },
        {
          name: "Pune",
          data: {
            2023: { "PM2.5": 49, PM10: 95, NO2: 32, SO2: 12, CO: 0.84, O3: 44 },
            2024: { "PM2.5": 46, PM10: 90, NO2: 30, SO2: 11, CO: 0.8, O3: 46 },
            2025: { "PM2.5": 43, PM10: 85, NO2: 28, SO2: 10, CO: 0.76, O3: 48 }
          }
        }
      ]
    },
    {
      name: "Manipur",
      districts: [
        {
          name: "Imphal West",
          data: {
            2023: { "PM2.5": 34, PM10: 67, NO2: 19, SO2: 9, CO: 0.63, O3: 38 },
            2024: { "PM2.5": 32, PM10: 63, NO2: 18, SO2: 8, CO: 0.6, O3: 39 },
            2025: { "PM2.5": 30, PM10: 60, NO2: 17, SO2: 8, CO: 0.57, O3: 40 }
          }
        },
        {
          name: "Bishnupur",
          data: {
            2023: { "PM2.5": 31, PM10: 62, NO2: 18, SO2: 8, CO: 0.6, O3: 37 },
            2024: { "PM2.5": 30, PM10: 59, NO2: 17, SO2: 8, CO: 0.58, O3: 38 },
            2025: { "PM2.5": 28, PM10: 56, NO2: 16, SO2: 7, CO: 0.55, O3: 39 }
          }
        }
      ]
    },
    {
      name: "Meghalaya",
      districts: [
        {
          name: "East Khasi Hills",
          data: {
            2023: { "PM2.5": 25, PM10: 50, NO2: 15, SO2: 7, CO: 0.52, O3: 36 },
            2024: { "PM2.5": 24, PM10: 48, NO2: 14, SO2: 7, CO: 0.5, O3: 37 },
            2025: { "PM2.5": 23, PM10: 46, NO2: 13, SO2: 6, CO: 0.48, O3: 38 }
          }
        },
        {
          name: "West Garo Hills",
          data: {
            2023: { "PM2.5": 27, PM10: 53, NO2: 16, SO2: 7, CO: 0.54, O3: 35 },
            2024: { "PM2.5": 26, PM10: 51, NO2: 15, SO2: 7, CO: 0.52, O3: 36 },
            2025: { "PM2.5": 24, PM10: 48, NO2: 14, SO2: 6, CO: 0.5, O3: 37 }
          }
        }
      ]
    },
    {
      name: "Mizoram",
      districts: [
        {
          name: "Aizawl",
          data: {
            2023: { "PM2.5": 23, PM10: 46, NO2: 14, SO2: 6, CO: 0.5, O3: 35 },
            2024: { "PM2.5": 22, PM10: 44, NO2: 13, SO2: 6, CO: 0.48, O3: 36 },
            2025: { "PM2.5": 21, PM10: 42, NO2: 12, SO2: 6, CO: 0.46, O3: 37 }
          }
        },
        {
          name: "Lunglei",
          data: {
            2023: { "PM2.5": 22, PM10: 43, NO2: 13, SO2: 6, CO: 0.48, O3: 34 },
            2024: { "PM2.5": 21, PM10: 41, NO2: 12, SO2: 5, CO: 0.46, O3: 35 },
            2025: { "PM2.5": 20, PM10: 39, NO2: 11, SO2: 5, CO: 0.44, O3: 36 }
          }
        }
      ]
    },
    {
      name: "Nagaland",
      districts: [
        {
          name: "Kohima",
          data: {
            2023: { "PM2.5": 28, PM10: 54, NO2: 16, SO2: 7, CO: 0.55, O3: 36 },
            2024: { "PM2.5": 27, PM10: 52, NO2: 15, SO2: 7, CO: 0.53, O3: 37 },
            2025: { "PM2.5": 25, PM10: 49, NO2: 14, SO2: 6, CO: 0.5, O3: 38 }
          }
        },
        {
          name: "Dimapur",
          data: {
            2023: { "PM2.5": 30, PM10: 58, NO2: 17, SO2: 8, CO: 0.58, O3: 35 },
            2024: { "PM2.5": 28, PM10: 55, NO2: 16, SO2: 7, CO: 0.55, O3: 36 },
            2025: { "PM2.5": 26, PM10: 52, NO2: 15, SO2: 7, CO: 0.52, O3: 37 }
          }
        }
      ]
    },
    {
      name: "Odisha",
      districts: [
        {
          name: "Khordha",
          data: {
            2023: { "PM2.5": 48, PM10: 93, NO2: 27, SO2: 12, CO: 0.82, O3: 41 },
            2024: { "PM2.5": 45, PM10: 88, NO2: 25, SO2: 11, CO: 0.78, O3: 43 },
            2025: { "PM2.5": 42, PM10: 83, NO2: 24, SO2: 10, CO: 0.74, O3: 45 }
          }
        },
        {
          name: "Cuttack",
          data: {
            2023: { "PM2.5": 50, PM10: 96, NO2: 28, SO2: 12, CO: 0.84, O3: 40 },
            2024: { "PM2.5": 47, PM10: 91, NO2: 26, SO2: 11, CO: 0.8, O3: 42 },
            2025: { "PM2.5": 44, PM10: 86, NO2: 25, SO2: 10, CO: 0.76, O3: 44 }
          }
        }
      ]
    },
    {
      name: "Punjab",
      districts: [
        {
          name: "Ludhiana",
          data: {
            2023: { "PM2.5": 78, PM10: 146, NO2: 39, SO2: 16, CO: 1.08, O3: 33 },
            2024: { "PM2.5": 73, PM10: 138, NO2: 37, SO2: 15, CO: 1.02, O3: 35 },
            2025: { "PM2.5": 68, PM10: 130, NO2: 35, SO2: 14, CO: 0.97, O3: 37 }
          }
        },
        {
          name: "Amritsar",
          data: {
            2023: { "PM2.5": 72, PM10: 136, NO2: 36, SO2: 15, CO: 1.01, O3: 34 },
            2024: { "PM2.5": 67, PM10: 128, NO2: 34, SO2: 14, CO: 0.95, O3: 36 },
            2025: { "PM2.5": 62, PM10: 121, NO2: 32, SO2: 13, CO: 0.9, O3: 38 }
          }
        }
      ]
    },
    {
      name: "Rajasthan",
      districts: [
        {
          name: "Jaipur",
          data: {
            2023: { "PM2.5": 67, PM10: 129, NO2: 35, SO2: 14, CO: 0.98, O3: 42 },
            2024: { "PM2.5": 63, PM10: 122, NO2: 33, SO2: 13, CO: 0.93, O3: 44 },
            2025: { "PM2.5": 59, PM10: 115, NO2: 31, SO2: 12, CO: 0.89, O3: 46 }
          }
        },
        {
          name: "Jodhpur",
          data: {
            2023: { "PM2.5": 61, PM10: 120, NO2: 32, SO2: 13, CO: 0.91, O3: 43 },
            2024: { "PM2.5": 57, PM10: 113, NO2: 30, SO2: 12, CO: 0.87, O3: 45 },
            2025: { "PM2.5": 53, PM10: 107, NO2: 28, SO2: 11, CO: 0.83, O3: 47 }
          }
        }
      ]
    },
    {
      name: "Sikkim",
      districts: [
        {
          name: "East Sikkim",
          data: {
            2023: { "PM2.5": 21, PM10: 42, NO2: 12, SO2: 6, CO: 0.45, O3: 36 },
            2024: { "PM2.5": 20, PM10: 40, NO2: 11, SO2: 5, CO: 0.43, O3: 37 },
            2025: { "PM2.5": 19, PM10: 38, NO2: 10, SO2: 5, CO: 0.41, O3: 38 }
          }
        },
        {
          name: "West Sikkim",
          data: {
            2023: { "PM2.5": 20, PM10: 40, NO2: 11, SO2: 5, CO: 0.43, O3: 35 },
            2024: { "PM2.5": 19, PM10: 38, NO2: 10, SO2: 5, CO: 0.41, O3: 36 },
            2025: { "PM2.5": 18, PM10: 36, NO2: 9, SO2: 4, CO: 0.39, O3: 37 }
          }
        }
      ]
    },
    {
      name: "Tamil Nadu",
      districts: [
        {
          name: "Chennai",
          data: {
            2023: { "PM2.5": 41, PM10: 81, NO2: 29, SO2: 11, CO: 0.77, O3: 44 },
            2024: { "PM2.5": 38, PM10: 76, NO2: 27, SO2: 10, CO: 0.73, O3: 46 },
            2025: { "PM2.5": 35, PM10: 71, NO2: 25, SO2: 9, CO: 0.69, O3: 48 }
          }
        },
        {
          name: "Coimbatore",
          data: {
            2023: { "PM2.5": 36, PM10: 71, NO2: 24, SO2: 9, CO: 0.69, O3: 43 },
            2024: { "PM2.5": 34, PM10: 67, NO2: 22, SO2: 8, CO: 0.66, O3: 45 },
            2025: { "PM2.5": 31, PM10: 63, NO2: 21, SO2: 8, CO: 0.63, O3: 47 }
          }
        }
      ]
    },
    {
      name: "Telangana",
      districts: [
        {
          name: "Hyderabad",
          data: {
            2023: { "PM2.5": 47, PM10: 92, NO2: 32, SO2: 12, CO: 0.84, O3: 43 },
            2024: { "PM2.5": 44, PM10: 87, NO2: 30, SO2: 11, CO: 0.8, O3: 45 },
            2025: { "PM2.5": 41, PM10: 82, NO2: 28, SO2: 10, CO: 0.76, O3: 47 }
          }
        },
        {
          name: "Warangal",
          data: {
            2023: { "PM2.5": 42, PM10: 83, NO2: 27, SO2: 11, CO: 0.78, O3: 42 },
            2024: { "PM2.5": 39, PM10: 78, NO2: 25, SO2: 10, CO: 0.74, O3: 44 },
            2025: { "PM2.5": 36, PM10: 73, NO2: 23, SO2: 9, CO: 0.7, O3: 46 }
          }
        }
      ]
    },
    {
      name: "Tripura",
      districts: [
        {
          name: "West Tripura",
          data: {
            2023: { "PM2.5": 33, PM10: 65, NO2: 18, SO2: 8, CO: 0.61, O3: 37 },
            2024: { "PM2.5": 31, PM10: 62, NO2: 17, SO2: 8, CO: 0.58, O3: 38 },
            2025: { "PM2.5": 29, PM10: 58, NO2: 16, SO2: 7, CO: 0.56, O3: 39 }
          }
        },
        {
          name: "Dhalai",
          data: {
            2023: { "PM2.5": 30, PM10: 59, NO2: 17, SO2: 7, CO: 0.58, O3: 36 },
            2024: { "PM2.5": 28, PM10: 56, NO2: 16, SO2: 7, CO: 0.55, O3: 37 },
            2025: { "PM2.5": 27, PM10: 53, NO2: 15, SO2: 6, CO: 0.53, O3: 38 }
          }
        }
      ]
    },
    {
      name: "Uttar Pradesh",
      districts: [
        {
          name: "Lucknow",
          data: {
            2023: { "PM2.5": 85, PM10: 158, NO2: 41, SO2: 17, CO: 1.18, O3: 32 },
            2024: { "PM2.5": 79, PM10: 149, NO2: 39, SO2: 16, CO: 1.11, O3: 34 },
            2025: { "PM2.5": 73, PM10: 140, NO2: 37, SO2: 15, CO: 1.05, O3: 36 }
          }
        },
        {
          name: "Kanpur Nagar",
          data: {
            2023: { "PM2.5": 91, PM10: 168, NO2: 44, SO2: 18, CO: 1.26, O3: 31 },
            2024: { "PM2.5": 85, PM10: 159, NO2: 42, SO2: 17, CO: 1.19, O3: 33 },
            2025: { "PM2.5": 79, PM10: 150, NO2: 40, SO2: 16, CO: 1.12, O3: 35 }
          }
        }
      ]
    },
    {
      name: "Uttarakhand",
      districts: [
        {
          name: "Dehradun",
          data: {
            2023: { "PM2.5": 54, PM10: 104, NO2: 28, SO2: 12, CO: 0.86, O3: 38 },
            2024: { "PM2.5": 50, PM10: 98, NO2: 26, SO2: 11, CO: 0.82, O3: 40 },
            2025: { "PM2.5": 46, PM10: 92, NO2: 24, SO2: 10, CO: 0.78, O3: 42 }
          }
        },
        {
          name: "Haridwar",
          data: {
            2023: { "PM2.5": 58, PM10: 111, NO2: 30, SO2: 13, CO: 0.9, O3: 37 },
            2024: { "PM2.5": 54, PM10: 105, NO2: 28, SO2: 12, CO: 0.86, O3: 39 },
            2025: { "PM2.5": 50, PM10: 99, NO2: 26, SO2: 11, CO: 0.82, O3: 41 }
          }
        }
      ]
    },
    {
      name: "West Bengal",
      districts: [
        {
          name: "Kolkata",
          data: {
            2023: { "PM2.5": 62, PM10: 119, NO2: 34, SO2: 14, CO: 0.94, O3: 38 },
            2024: { "PM2.5": 58, PM10: 112, NO2: 32, SO2: 13, CO: 0.9, O3: 40 },
            2025: { "PM2.5": 54, PM10: 106, NO2: 30, SO2: 12, CO: 0.86, O3: 42 }
          }
        },
        {
          name: "Howrah",
          data: {
            2023: { "PM2.5": 59, PM10: 114, NO2: 32, SO2: 13, CO: 0.9, O3: 39 },
            2024: { "PM2.5": 55, PM10: 108, NO2: 30, SO2: 12, CO: 0.86, O3: 41 },
            2025: { "PM2.5": 51, PM10: 102, NO2: 28, SO2: 11, CO: 0.82, O3: 43 }
          }
        }
      ]
    },
    {
      name: "Andaman and Nicobar Islands",
      districts: [
        {
          name: "South Andaman",
          data: {
            2023: { "PM2.5": 18, PM10: 36, NO2: 10, SO2: 5, CO: 0.38, O3: 41 },
            2024: { "PM2.5": 17, PM10: 34, NO2: 9, SO2: 4, CO: 0.36, O3: 42 },
            2025: { "PM2.5": 16, PM10: 32, NO2: 8, SO2: 4, CO: 0.34, O3: 43 }
          }
        },
        {
          name: "North and Middle Andaman",
          data: {
            2023: { "PM2.5": 17, PM10: 34, NO2: 9, SO2: 4, CO: 0.36, O3: 40 },
            2024: { "PM2.5": 16, PM10: 32, NO2: 8, SO2: 4, CO: 0.34, O3: 41 },
            2025: { "PM2.5": 15, PM10: 30, NO2: 7, SO2: 3, CO: 0.32, O3: 42 }
          }
        }
      ]
    },
    {
      name: "Chandigarh",
      districts: [
        {
          name: "Chandigarh",
          data: {
            2023: { "PM2.5": 64, PM10: 124, NO2: 34, SO2: 14, CO: 0.96, O3: 35 },
            2024: { "PM2.5": 60, PM10: 117, NO2: 32, SO2: 13, CO: 0.92, O3: 37 },
            2025: { "PM2.5": 56, PM10: 110, NO2: 30, SO2: 12, CO: 0.88, O3: 39 }
          }
        }
      ]
    },
    {
      name: "Dadra and Nagar Haveli and Daman and Diu",
      districts: [
        {
          name: "Daman",
          data: {
            2023: { "PM2.5": 37, PM10: 73, NO2: 22, SO2: 10, CO: 0.68, O3: 44 },
            2024: { "PM2.5": 35, PM10: 69, NO2: 21, SO2: 9, CO: 0.65, O3: 46 },
            2025: { "PM2.5": 33, PM10: 65, NO2: 20, SO2: 8, CO: 0.62, O3: 48 }
          }
        },
        {
          name: "Dadra and Nagar Haveli",
          data: {
            2023: { "PM2.5": 39, PM10: 76, NO2: 23, SO2: 10, CO: 0.7, O3: 43 },
            2024: { "PM2.5": 36, PM10: 72, NO2: 22, SO2: 9, CO: 0.67, O3: 45 },
            2025: { "PM2.5": 34, PM10: 68, NO2: 20, SO2: 9, CO: 0.64, O3: 47 }
          }
        }
      ]
    },
    {
      name: "Delhi",
      districts: [
        {
          name: "New Delhi",
          data: {
            2023: { "PM2.5": 98, PM10: 180, NO2: 52, SO2: 19, CO: 1.35, O3: 33 },
            2024: { "PM2.5": 92, PM10: 170, NO2: 49, SO2: 18, CO: 1.28, O3: 35 },
            2025: { "PM2.5": 86, PM10: 160, NO2: 46, SO2: 17, CO: 1.2, O3: 37 }
          }
        },
        {
          name: "North Delhi",
          data: {
            2023: { "PM2.5": 94, PM10: 173, NO2: 49, SO2: 18, CO: 1.3, O3: 34 },
            2024: { "PM2.5": 88, PM10: 163, NO2: 46, SO2: 17, CO: 1.23, O3: 36 },
            2025: { "PM2.5": 82, PM10: 154, NO2: 43, SO2: 16, CO: 1.16, O3: 38 }
          }
        }
      ]
    },
    {
      name: "Jammu and Kashmir",
      districts: [
        {
          name: "Srinagar",
          data: {
            2023: { "PM2.5": 44, PM10: 86, NO2: 24, SO2: 11, CO: 0.76, O3: 37 },
            2024: { "PM2.5": 41, PM10: 81, NO2: 22, SO2: 10, CO: 0.72, O3: 39 },
            2025: { "PM2.5": 38, PM10: 76, NO2: 21, SO2: 9, CO: 0.68, O3: 41 }
          }
        },
        {
          name: "Jammu",
          data: {
            2023: { "PM2.5": 52, PM10: 101, NO2: 28, SO2: 12, CO: 0.84, O3: 38 },
            2024: { "PM2.5": 48, PM10: 95, NO2: 26, SO2: 11, CO: 0.8, O3: 40 },
            2025: { "PM2.5": 45, PM10: 89, NO2: 24, SO2: 10, CO: 0.76, O3: 42 }
          }
        }
      ]
    },
    {
      name: "Ladakh",
      districts: [
        {
          name: "Leh",
          data: {
            2023: { "PM2.5": 16, PM10: 32, NO2: 8, SO2: 4, CO: 0.32, O3: 39 },
            2024: { "PM2.5": 15, PM10: 30, NO2: 7, SO2: 3, CO: 0.3, O3: 40 },
            2025: { "PM2.5": 14, PM10: 28, NO2: 7, SO2: 3, CO: 0.28, O3: 41 }
          }
        },
        {
          name: "Kargil",
          data: {
            2023: { "PM2.5": 17, PM10: 33, NO2: 9, SO2: 4, CO: 0.34, O3: 38 },
            2024: { "PM2.5": 16, PM10: 31, NO2: 8, SO2: 4, CO: 0.32, O3: 39 },
            2025: { "PM2.5": 15, PM10: 29, NO2: 7, SO2: 3, CO: 0.3, O3: 40 }
          }
        }
      ]
    },
    {
      name: "Lakshadweep",
      districts: [
        {
          name: "Kavaratti",
          data: {
            2023: { "PM2.5": 15, PM10: 30, NO2: 8, SO2: 3, CO: 0.3, O3: 43 },
            2024: { "PM2.5": 14, PM10: 28, NO2: 7, SO2: 3, CO: 0.28, O3: 44 },
            2025: { "PM2.5": 13, PM10: 26, NO2: 6, SO2: 2, CO: 0.26, O3: 45 }
          }
        }
      ]
    },
    {
      name: "Puducherry",
      districts: [
        {
          name: "Puducherry",
          data: {
            2023: { "PM2.5": 32, PM10: 63, NO2: 22, SO2: 9, CO: 0.64, O3: 45 },
            2024: { "PM2.5": 30, PM10: 60, NO2: 21, SO2: 8, CO: 0.61, O3: 47 },
            2025: { "PM2.5": 28, PM10: 56, NO2: 19, SO2: 8, CO: 0.58, O3: 49 }
          }
        },
        {
          name: "Karaikal",
          data: {
            2023: { "PM2.5": 30, PM10: 59, NO2: 20, SO2: 8, CO: 0.61, O3: 44 },
            2024: { "PM2.5": 28, PM10: 56, NO2: 19, SO2: 8, CO: 0.58, O3: 46 },
            2025: { "PM2.5": 26, PM10: 52, NO2: 17, SO2: 7, CO: 0.55, O3: 48 }
          }
        }
      ]
    }
  ]
};

export default indiaAirQualityData;
