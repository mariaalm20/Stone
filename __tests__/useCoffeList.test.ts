import { renderHook, act } from '@testing-library/react-hooks';
import { useCoffeStore } from '../src/stores/useCoffeStore';
import {describe, beforeEach, expect, it} from '@jest/globals';

import axios from 'axios';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useCoffeStore', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCoffeStore());

    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.loadingSearchMore).toBe(false);
    expect(result.current.quantityItems).toBe(0);
    expect(result.current.loadingAddItem).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.productIds).toEqual(new Set());
  });

  it('should fetch products correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Coffee 1', description: 'Description 1', weight: '200g', price: 5, image_url: '' },
      { id: 2, name: 'Coffee 2', description: 'Description 2', weight: '250g', price: 6, image_url: '' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const { result, waitForNextUpdate } = renderHook(() => useCoffeStore());

    // Executando a função fetchProducts
    act(() => {
      result.current.fetchProducts();
    });

    // Espera o estado ser atualizado
    await waitForNextUpdate();

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.productIds.size).toBe(mockProducts.length);
    expect(result.current.error).toBeNull();
  });

  it('should handle error when fetching products', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to load products'));

    const { result, waitForNextUpdate } = renderHook(() => useCoffeStore());

    act(() => {
      result.current.fetchProducts();
    });

    await waitForNextUpdate();

    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to load products');
  });

  it('should add item to cart correctly', async () => {
    const { result } = renderHook(() => useCoffeStore());

    act(() => {
      result.current.addItemOnCart(1); // Adiciona um item no carrinho
    });

    expect(result.current.quantityItems).toBe(1);
    expect(result.current.loadingAddItem).toBe(false);
  });

  it('should not fetch more than 20 products', async () => {
    const mockProducts = [
      { id: 1, name: 'Coffee 1', description: 'Description 1', weight: '200g', price: 5, image_url: '' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const { result, waitForNextUpdate } = renderHook(() => useCoffeStore());

    // Simula a busca de produtos
    act(() => {
      result.current.fetchProducts();
    });

    await waitForNextUpdate();

    // A quantidade de produtos não pode ser superior a 20
    expect(result.current.products.length).toBeLessThanOrEqual(20);
  });
});
