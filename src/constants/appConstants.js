/**
 * Application constants untuk konsistensi dan maintainability
 */

// Pagination defaults
export const PAGINATION = {
  DEFAULT_ITEMS_PER_PAGE: 10,
  ITEMS_PER_PAGE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_LOAD_ITEMS: 100,
};

// Search fields untuk berbagai entities
export const SEARCH_FIELDS = {
  QUIZ: ["question", "answer", "options"],
  MISSION: ["title", "description", "subject", "level"],
  BADGE: ["name", "description", "category"],
};

// API limits
export const API_LIMITS = {
  QUIZ_LOAD_LIMIT: 100,
  MISSION_LOAD_LIMIT: 100,
  BADGE_LOAD_LIMIT: 100,
};

// UI Messages
export const MESSAGES = {
  LOADING: "Loading...",
  NO_DATA: "No data available",
  SEARCH_PLACEHOLDER: {
    QUIZ: "Search quizzes...",
    MISSION: "Search missions...",
    BADGE: "Search badges...",
  },
  EMPTY_STATE: {
    QUIZ: "No quizzes found",
    MISSION: "No missions found",
    BADGE: "No badges found",
  },
  CONFIRM_DELETE: {
    QUIZ: "Are you sure you want to delete this quiz?",
    MISSION: "Are you sure you want to delete this mission?",
    BADGE: "Are you sure you want to delete this badge?",
  },
};

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    QUIZ_CREATED: "Quiz created successfully!",
    QUIZ_UPDATED: "Quiz updated successfully!",
    QUIZ_DELETED: "Quiz deleted successfully!",
    MISSION_CREATED: "Mission created successfully!",
    MISSION_UPDATED: "Mission updated successfully!",
    MISSION_DELETED: "Mission deleted successfully!",
  },
  ERROR: {
    QUIZ_CREATE_FAILED: "Failed to create quiz",
    QUIZ_UPDATE_FAILED: "Failed to update quiz",
    QUIZ_DELETE_FAILED: "Failed to delete quiz",
    MISSION_CREATE_FAILED: "Failed to create mission",
    MISSION_UPDATE_FAILED: "Failed to update mission",
    MISSION_DELETE_FAILED: "Failed to delete mission",
    USER_NOT_FOUND: "User not found. Please login again.",
  },
};
