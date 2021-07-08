import { useContext } from 'react';
import { DetailsContext } from '../context/DetailsContext';

export default function useDetailsProvider() {
  const value = useContext(DetailsContext);
  return value;
}
