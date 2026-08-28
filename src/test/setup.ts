import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

vi.mock("@/context/Auth", () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    token: undefined,
    isLoading: false,
    refreshToken: vi.fn()
  })),
  AuthCtxProvider: ({ children }: any) => children
}))

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))