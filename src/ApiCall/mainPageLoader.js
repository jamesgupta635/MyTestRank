import axios from 'axios';

const API_BASE_URL = 'http://88.222.214.204:8085';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Individual API calls
export const getBanners = async () => {
  const response = await api.get('/banner/getBanners');
  return response.data;
};

export const getAllCourses = async () => {
  const response = await api.get('/fetch/allCourseMainPage');
  return response.data;
};

export const getAllPlans = async () => {
  const response = await api.get('/plans/allPlans');
  return response.data;
};

// Main loader function
export const loadMainPageData = async () => {
  const result = {
    banners: null,
    courses: null,
    plans: null,
    error: null,
    timings: {},
  };

  try {
    const start = Date.now();

    // 1. Load banners
    const bannersStart = Date.now();
    result.banners = await getBanners();
    result.timings.banners = Date.now() - bannersStart;

    // 2. Load courses
    const coursesStart = Date.now();
    result.courses = await getAllCourses();
    result.timings.courses = Date.now() - coursesStart;

    // 3. Load plans
    const plansStart = Date.now();
    result.plans = await getAllPlans();
    result.timings.plans = Date.now() - plansStart;

    result.timings.total = Date.now() - start;
  } catch (error) {
    result.error = error;
    console.error('Error loading main page data:', error);
  }

  return result;
};