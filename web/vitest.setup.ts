import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

beforeAll(() => {
  process.env.VUE_APP_BASE_API = "http://localhost:3000";
});

// Mock window.alert
global.alert = vi.fn();
