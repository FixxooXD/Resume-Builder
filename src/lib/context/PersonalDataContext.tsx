"use client"
import { createContext, useContext, ReactNode, useState } from "react";

// Define PersonalDataType
type PersonalInfoType = {
  name: string;
  email: string;
  phone: string;
};

const defaultPersonalInfo: PersonalInfoType = {
  name: '',
  email: '',
  phone: ''
};

// This is a function that accepts a new state of type PersonalDataType
interface PersonalInfoContextType {
  personalInfo: PersonalInfoType;  // The personalInfo will hold name, email, phone
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfoType>>;  // setPersonalInfo is a function to update the state
}

// Provider component
type Props = {
  children: ReactNode;
};

//Create Context
const PersonalInfoContext = 
createContext<PersonalInfoContextType>({personalInfo: defaultPersonalInfo, setPersonalInfo: () => {}});

// Create Provider
export function PersonalInfoProvider({ children }: Props) {

  let [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);

  return (
    <PersonalInfoContext.Provider value={{ personalInfo, setPersonalInfo }}>
      {children}
    </PersonalInfoContext.Provider>
  )
}

//Custom Hook to use the context
export function usePersonalInfo() {
  return useContext(PersonalInfoContext);
}   
