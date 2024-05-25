
import React from 'react';
import { useGetInquiriesQuery } from '../redux/slices/api/userApiSlice';

const ContactInquiries = () => {

  const {data,isLoading} = useGetInquiriesQuery();
  console.log(data);
  const datas = [
    {
      Fullname: 'John Doe',
      Email: 'john.doe@data.com',
      Subject: 'Question about task priorities',
      Message: 'I have a question regarding how task priorities are assigned in the platform.'
    },
    {
      Fullname: 'Alice Smith',
      Email: 'alice.smith@data.com',
      Subject: 'Issue with task due dates',
      Message: 'I encountered a problem where task due dates are not displaying correctly.'
    },
    {
      Fullname: 'Bob Johnson',
      Email: 'bob.johnson@data.com',
      Subject: 'Feature request: Kanban board',
      Message: 'I would like to suggest adding a Kanban board feature to better visualize task progress.'
    }
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Inquiries</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((data, index) => (
          <div className="bg-white p-4 rounded-lg shadow-md" key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold">{data.name}</span>
              <span className="text-gray-600">{data.email}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-700 font-semibold">Subject: </span>
              <span>{data.subject}</span>
            </div>
            <div>
              <span className="text-gray-700 font-semibold">Message: </span>
              <span>{data.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInquiries;
