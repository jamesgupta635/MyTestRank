// User Dashboard API Service
// This file documents the expected backend endpoints for the enhanced UserDashboard

import { axiosInstance } from '../utils/api';

// User Statistics API
export const getUserStats = async () => {
  try {
    const response = await axiosInstance.get('/user/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    // Return default stats if API fails
    return {
      testsCompleted: 0,
      averageSpeed: 0,
      totalTimeSpent: 0,
      currentStreak: 0,
      bestSpeed: 0,
      level: 1
    };
  }
};

// Recent Tests API
export const getRecentTests = async () => {
  try {
    const response = await axiosInstance.get('/user/recent-tests');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent tests:', error);
    return [];
  }
};

// Achievements API
export const getAchievements = async () => {
  try {
    const response = await axiosInstance.get('/user/achievements');
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

// Update User Profile API
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put('/user/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Get User Progress API
export const getUserProgress = async () => {
  try {
    const response = await axiosInstance.get('/user/progress');
    return response.data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return {
      level: 1,
      experience: 0,
      nextLevelExperience: 100
    };
  }
};

// Expected Backend Endpoints Documentation:
/*
GET /user/stats
Response: {
  testsCompleted: number,
  averageSpeed: number,
  totalTimeSpent: number, // in minutes
  currentStreak: number, // days
  bestSpeed: number,
  level: number
}

GET /user/recent-tests
Response: [
  {
    id: string,
    testName: string,
    completed: boolean,
    completedAt: string, // ISO date
    speed: number,
    accuracy: number,
    duration: number
  }
]

GET /user/achievements
Response: [
  {
    id: string,
    name: string,
    description: string,
    icon: string,
    unlocked: boolean,
    unlockedAt: string // ISO date
  }
]

PUT /user/profile
Body: {
  firstName?: string,
  lastName?: string,
  preferences?: object
}

GET /user/progress
Response: {
  level: number,
  experience: number,
  nextLevelExperience: number,
  progressPercentage: number
}
*/