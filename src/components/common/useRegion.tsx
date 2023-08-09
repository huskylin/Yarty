import { useState } from 'react';
import { useQuery } from 'react-query';
import { YouTubeVideosResponse } from '@/interface/Videos';

const apiPath = process.env.API_PATH;

const fetchRegion = async () => {
  try {
    const res = await fetch(`${apiPath}/api/region`);
    const data = await res.json();
    return data.countryCode;
  } catch (error) {
    return navigator.language.split('-')[1];
  }
};

export const useRegion = () => {
  const [region, setRegion] = useState('TW');

  useQuery('region', fetchRegion, {
    onSuccess: (data: string) => {
      setRegion(data);
    },
  });

  return region;
};

export const useRegionRestriction = (videoIds: string[]) => {
  const region = useRegion();

  const fetchRegionRestriction = async () => {
    if (videoIds.length === 0) return;

    const videoIdsParam = videoIds.join(',');

    const res = await fetch(`${apiPath}/api/videos/${videoIdsParam}`);
    const data: YouTubeVideosResponse = await res.json();

    const restricted = data.items.map((item) => {
      if (
        item.contentDetails.regionRestriction &&
        item.contentDetails.regionRestriction.blocked
      ) {
        return item.contentDetails.regionRestriction.blocked.includes(region);
      }
      return false;
    });

    return restricted;
  };

  return useQuery(['regionRestriction', videoIds], fetchRegionRestriction);
};
