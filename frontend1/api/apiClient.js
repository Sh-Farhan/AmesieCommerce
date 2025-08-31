import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from './config';

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  async getAuthToken() {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  async setAuthToken(token) {
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  }

  async removeAuthToken() {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getAuthToken();
    
    const config = {
      ...options,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    return this.request(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.access_token) {
      await this.setAuthToken(response.access_token);
    }
    
    return response;
  }

  async logout() {
    await this.removeAuthToken();
  }

  async getProfile() {
    return this.request(API_CONFIG.ENDPOINTS.ME);
  }

  async updateProfile(userData) {
    return this.request(API_CONFIG.ENDPOINTS.UPDATE_PROFILE, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Posts methods
  async getPosts(page = 0, limit = 20) {
    return this.request(`${API_CONFIG.ENDPOINTS.POSTS}?skip=${page * limit}&limit=${limit}`);
  }

  async getPost(postId) {
    return this.request(`${API_CONFIG.ENDPOINTS.POSTS}/${postId}`);
  }

  async createPost(postData) {
    return this.request(API_CONFIG.ENDPOINTS.POSTS, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(postId, postData) {
    return this.request(`${API_CONFIG.ENDPOINTS.POSTS}/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(postId) {
    return this.request(`${API_CONFIG.ENDPOINTS.POSTS}/${postId}`, {
      method: 'DELETE',
    });
  }

  async getMyPosts(page = 0, limit = 20) {
    return this.request(`${API_CONFIG.ENDPOINTS.MY_POSTS}?skip=${page * limit}&limit=${limit}`);
  }

  // Users methods
  async getUsers(page = 0, limit = 20) {
    return this.request(`${API_CONFIG.ENDPOINTS.USERS}?skip=${page * limit}&limit=${limit}`);
  }

  async getUser(userId) {
    return this.request(`${API_CONFIG.ENDPOINTS.USERS}/${userId}`);
  }
}

export default new ApiClient();