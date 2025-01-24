export   interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }


  export  interface EpisodeDetails {
      name: string;
      type: string;
      episode: string;
      residents: string[];
    }

    export  interface LocationDetails {
        name: string;
        type: string;
        dimension: string;
        residents: string[];
        }

