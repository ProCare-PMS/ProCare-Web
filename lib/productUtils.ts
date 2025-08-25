/**
 * 🎯 Product Utilities for POS System
 * 
 * This utility provides functions to handle product identification and
 * unique key generation consistently across the POS system.
 */

export interface Product {
  id?: string;
  name: string;
  quantity: number;
  selling_price: string;
}

/**
 * Generate a unique key for a product
 * Uses ID if available, otherwise creates a unique key from name and index
 */
export const generateProductKey = (product: Product, index: number): string => {
  if (product.id) {
    return product.id;
  }
  
  // Create a unique key from name and index
  // This ensures uniqueness even for products with the same name
  return `${product.name}_${index}`;
};

/**
 * Generate a unique identifier for a product that can be used as a key
 * This is more robust than just using the name
 */
export const generateProductIdentifier = (product: Product, index: number): string => {
  if (product.id) {
    return product.id;
  }
  
  // Create a hash-like identifier from name and index
  const nameHash = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 8);
  
  return `${nameHash}_${index}_${Date.now()}`;
};

/**
 * Find a product by name in an array
 * This is a fallback for when ID-based lookup isn't available
 */
export const findProductByName = (products: Product[], name: string): Product | undefined => {
  return products.find(p => p.name === name);
};

/**
 * Find a product by ID in an array
 * This is the preferred method when IDs are available
 */
export const findProductById = (products: Product[], id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

/**
 * Create a unique product key that's safe for React rendering
 * Ensures no duplicate keys even with products of the same name
 */
export const createSafeProductKey = (product: Product, index: number, context?: string): string => {
  const baseKey = generateProductKey(product, index);
  
  if (context) {
    return `${context}_${baseKey}`;
  }
  
  return baseKey;
};

/**
 * Validate that a product has all required fields
 */
export const validateProduct = (product: any): product is Product => {
  return (
    product &&
    typeof product.name === 'string' &&
    typeof product.quantity === 'number' &&
    typeof product.selling_price === 'string' &&
    product.name.trim() !== '' &&
    product.quantity >= 0
  );
};

/**
 * Create a product map for efficient lookups
 * Maps product names to products for backward compatibility
 */
export const createProductMap = (products: Product[]): Map<string, Product> => {
  const productMap = new Map<string, Product>();
  
  products.forEach((product, index) => {
    // Use the unique key as the map key
    const key = generateProductKey(product, index);
    productMap.set(key, product);
    
    // Also map by name for backward compatibility
    // Note: This could cause issues if multiple products have the same name
    if (!productMap.has(product.name)) {
      productMap.set(product.name, product);
    }
  });
  
  return productMap;
};
