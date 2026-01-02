import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import useFormdata from './formDataHandler';

vi.mock('axios');
describe('useFormdata Hook', () => {
  const MOCK_URL = 'https://my-gcp-func.com';
  const mockEvent = { preventDefault: vi.fn() };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //Init
  it('form initializes with default empty state', () => {
    const { result } = renderHook(() => useFormdata(MOCK_URL));

    expect(result.current.formData).toEqual({
      skin_types: '',
      skin_concerns: '',
      hair_types: '',
      hair_concerns: '',
      makeup_preferences: '',
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.initialScreen).toBe(true);
    expect(result.current.error).toBe('');
  });

  // Input Logic 
  it('formData is updated when handleChange is called', () => {
    const { result } = renderHook(() => useFormdata(MOCK_URL));

    act(() => {
      result.current.handleChange({
        target: { name: 'skin_types', value: 'Dry' }
      });
    });

    expect(result.current.formData.skin_types).toBe('Dry');
    expect(result.current.formData.hair_types).toBe('');
  });


  it('missing form fields return error', async () => {
    const { result } = renderHook(() => useFormdata(MOCK_URL));

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.error).toBe('Please select all options');
    expect(axios.post).not.toHaveBeenCalled();
  });

  //GCP API Response
  it('valid form data submits', async () => {
    const { result } = renderHook(() => useFormdata(MOCK_URL));

    const mockResponse = { data: { message: 'Success!' } };
    axios.post.mockResolvedValueOnce(mockResponse);


    act(() => {
      const keys = Object.keys(result.current.formData);
      keys.forEach((key) => {
        result.current.handleChange({ target: { name: key, value: 'test' } });
      });
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(axios.post).toHaveBeenCalledWith(MOCK_URL, result.current.formData);
    expect(result.current.response).toEqual(mockResponse.data);
    expect(result.current.loading).toBe(false);
    expect(result.current.initialScreen).toBe(false);
  });

  //GCP API failed response
  it('server errors are handled gracefully', async () => {
    const { result } = renderHook(() => useFormdata(MOCK_URL));

    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    act(() => {
      result.current.handleChange({ target: { name: 'skin_types', value: 'test' } });
      result.current.handleChange({ target: { name: 'skin_concerns', value: 'test' } });
      result.current.handleChange({ target: { name: 'hair_types', value: 'test' } });
      result.current.handleChange({ target: { name: 'hair_concerns', value: 'test' } });
      result.current.handleChange({ target: { name: 'makeup_preferences', value: 'test' } });
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.error).toBe('The server is having internal issues. Plase try again.');
    expect(result.current.loading).toBe(false);
  });

  it('handleDealSubmit sends the correct specific payload', async () => {
    const { result } = renderHook(() => useFormdata(MOCK_URL));
    axios.post.mockResolvedValueOnce({ data: 'ok' });

    await act(async () => {
      await result.current.handleDealSubmit(mockEvent);
    });

    expect(axios.post).toHaveBeenCalledWith(
      MOCK_URL,
      { todays_deals: 'todays_deals' }
    );
  });
});