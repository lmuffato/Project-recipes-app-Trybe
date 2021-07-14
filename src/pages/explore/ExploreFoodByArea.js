import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import getByArea from '../../services/getFoodByArea';

export default function ExploreFoodByArea() {
  const [area, setArea] = useState([])
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    const getArea = async () => {
      setLoading(true);
      const data = await getByArea();
      setArea(data);
      console.log(data);
      setLoading(false);
    }
    getArea();
  }, []);

  const renderFilter = () => {
    
  }

  return (
    <div>
      <Header title="Explorar Origem" show />
      <BottomMenu />
    </div>
  );
}
