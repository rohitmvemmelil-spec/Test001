// Type definitions for API and web testing

export interface User {
  id: number
  name: string
  username: string
  email: string
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone?: string
  website?: string
  company?: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface Album {
  id: number
  userId: number
  title: string
}

export interface Photo {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export interface ApiResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface FormValidationRule {
  required?: boolean
  type?: string
  placeholder?: string
  minLength?: number
  maxLength?: number
  pattern?: string
}

export interface TestData {
  users: User[]
  posts: Post[]
  comments: Comment[]
  albums: Album[]
  photos: Photo[]
  todos: Todo[]
}

// API Error types
export interface ApiError {
  status: number
  message: string
  code?: string
}

// Web element selectors
export interface Selectors {
  loginForm: string
  usernameInput: string
  passwordInput: string
  submitButton: string
  errorMessage: string
  successMessage: string
}

// Test configuration
export interface TestConfig {
  baseUrl: string
  apiBaseUrl: string
  timeout: number
  retries: number
  viewport: {
    width: number
    height: number
  }
}

// Custom command return types
export interface CustomCommands {
  login: (username: string, password: string) => Cypress.Chainable<void>
  apiRequest: (method: string, endpoint: string, options?: any) => Cypress.Chainable<any>
  validateApiResponse: (response: any, expectedFields: string[]) => Cypress.Chainable<void>
  waitForPageLoad: () => Cypress.Chainable<void>
  shouldBeVisibleAndClickable: (selector: string) => Cypress.Chainable<void>
  validateForm: (formSelector: string, validationRules: Record<string, FormValidationRule>) => Cypress.Chainable<void>
  validateResponseTime: (maxTime: number) => Cypress.Chainable<void>
  checkAccessibility: () => Cypress.Chainable<void>
  testMobileView: () => Cypress.Chainable<void>
  testDesktopView: () => Cypress.Chainable<void>
}
