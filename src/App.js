
import {useEffect, useState} from 'react';
import{
  urlClient,
  LENS_HUB_CONTRACT_ADDRESS,
  queryRecommendedProfiles,
  queryExplorePublications,
} from './queries';

import LENS_HUB from './lens-hub';
import {ethers} from 'ethers';
import {Box, Button, Image} from '@chakra-ui/react';

function App() {
  
    const [account, setAccount] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [posts, setPosts] = useState([]);

    async function signIn(){
      // allows to call metamask and connect to the blockchain to sign in
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0]);

    }

    async function getRecommendedProfiles(){
      // get the profiles of the user
      // const profiles = await queryRecommendedProfiles(urlClient, account);
      // setProfiles(profiles);
      const response = await urlClient.query(queryRecommendedProfiles).toPromise();
      const profiles = response.data.recommendedProfiles.slice(0,5);
      setProfiles(profiles);
    }

    async function getPosts(){
      // get the posts of the user
      // const posts = await queryExplorePublications(urlClient, account);
      // setPosts(posts);

      const response = await urlClient.query(queryExplorePublications).toPromise();
      const posts = response.data.explorePublications.items.filter((post)=> {
        if(post.profile) return post;
          return "";
        
      })
      setPosts(posts);
    }

    async function followProfile(profile){
      // follow a profile
      const lensHub = new ethers.Contract(LENS_HUB_CONTRACT_ADDRESS, LENS_HUB.abi, window.ethereum);
      const tx = await lensHub.follow(profile.id);
      await tx.wait();
    }
    return (
    <div className="app">
    
    </div>
  );
}

export default App;
