import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import ConfirmatioDialog from "../components/Dialogs";

const Assets = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [selected, setSelected] = useState(null);
 

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };



  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Name</th>
        <th className='py-2'>Size</th>    
      </tr>
    </thead>
  );

  const TableRow = ({ asset }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          {asset.name}
        </div>
      </td>

      <td className='p-2'>{asset.size}</td>



      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(asset?._id)}
        />
      </td>
    </tr>
  );
  const handleFileUpload = (event) => {
    const files = event.target.files;
    console.log(files);
  };
  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='  Assets' />
          <label
  htmlFor="asset-upload"
  className="flex flex-row-reverse gap-1 items-center bg-[#0C9E7B] text-white rounded-md 2xl:py-2.5 cursor-pointer px-4 py-2"
>
 
  Add an asset
  <input
    id="asset-upload"
    type="file"
    className="hidden"
    onChange={handleFileUpload}
  /> <IoMdAdd className="text-lg" />
</label>
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {assets?.map((asset, index) => (
                  <TableRow key={index} asset={asset} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Assets;
