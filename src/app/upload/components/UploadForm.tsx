'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiPlus, FiX, FiUpload } from 'react-icons/fi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { createCar } from '@/lib/db';
import { uploadMultipleImages } from '@/lib/upload';

interface UploadFormProps {
  userId: string | undefined;
}

const UploadForm: React.FC<UploadFormProps> = ({ userId }) => {
  const router = useRouter();
  
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modifications, setModifications] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [newModification, setNewModification] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAddModification = () => {
    if (newModification.trim() !== '') {
      setModifications([...modifications, newModification.trim()]);
      setNewModification('');
    }
  };
  
  const handleRemoveModification = (index: number) => {
    setModifications(modifications.filter((_, i) => i !== index));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages([...images, ...selectedFiles]);
      
      // Create preview URLs
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };
  
  const validateForm = () => {
    if (!userId) {
      setError('You must be logged in to upload a build');
      return false;
    }
    
    if (!make) {
      setError('Car make is required');
      return false;
    }
    
    if (!model) {
      setError('Car model is required');
      return false;
    }
    
    if (!title) {
      setError('Title is required');
      return false;
    }
    
    if (!description) {
      setError('Description is required');
      return false;
    }
    
    if (images.length === 0) {
      setError('At least one image is required');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      // Upload images
      const imageUrls = await uploadMultipleImages(images, `cars/${userId}`);
      
      // Create car in database
      const carData = {
        userId: userId!,
        make,
        model,
        year,
        title,
        description,
        modifications,
        images: imageUrls,
      };
      
      const carRef = await createCar(carData);
      
      // Redirect to the new car page
      router.push(`/cars/${carRef.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while uploading your build');
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Car Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="make"
            label="Car Make"
            placeholder="e.g. Toyota"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
          
          <Input
            id="model"
            label="Car Model"
            placeholder="e.g. Supra"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
          
          <Input
            id="year"
            type="number"
            label="Year"
            placeholder="e.g. 2020"
            value={year.toString()}
            onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
            required
          />
          
          <Input
            id="title"
            label="Build Title"
            placeholder="e.g. My Custom Drift Build"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Build Description</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={5}
            placeholder="Describe your build, its story, and what makes it special..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Modifications</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            id="modification"
            placeholder="e.g. Custom exhaust"
            value={newModification}
            onChange={(e) => setNewModification(e.target.value)}
          />
          
          <Button
            type="button"
            onClick={handleAddModification}
            variant="secondary"
          >
            <FiPlus className="mr-1" /> Add
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {modifications.map((mod, index) => (
            <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
              <span className="text-sm">{mod}</span>
              <button
                type="button"
                onClick={() => handleRemoveModification(index)}
                className="ml-1 text-gray-500 hover:text-red-500"
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
          
          {modifications.length === 0 && (
            <p className="text-sm text-gray-500">No modifications added yet</p>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Images</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Photos
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
                >
                  <FiX size={16} className="text-red-500" />
                </button>
              </div>
            ))}
            
            <label className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary aspect-square">
              <FiUpload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
            </label>
          </div>
          
          <p className="text-xs text-gray-500">
            You can upload multiple images. The first image will be used as the cover.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={loading}
          className="px-8"
        >
          Share Build
        </Button>
      </div>
    </form>
  );
};

export default UploadForm; 