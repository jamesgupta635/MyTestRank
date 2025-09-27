import { publicGet } from '../utils/api';

// Individual API calls using public endpoints
export const getBanners = async () => {
  return await publicGet('/banner/getBanners');
};

export const getAllCourses = async () => {
  return await publicGet('/fetch/allCourseMainPage');
};

export const getAllPlans = async () => {
  return await publicGet('/plans/allPlans');
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