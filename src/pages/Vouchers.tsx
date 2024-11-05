import { Button } from '@/components/ui/button';
import { TicketPlusIcon, PencilLine, Trash2, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { deleteVouchers, setVouchers } from '@/voucherSlice';
import { Dialog, DialogContent } from '@/components/ui/dialog';


const Vouchers = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
      navigate(path);
  };

  const dispatch = useDispatch();
  const vouchers = useSelector(
      (state: RootState) => state.voucher.vouchers
  );

   useEffect(() => {
       const fetchVouchers = async () => {
           try {
               const response = await fetch(
                   `http://localhost:4200/api/vouchers`,
                   {
                       headers: {
                           'Content-Type': 'application/json',
                       },
                   }
               );
               const result = await response.json();
               console.log('🚀 ~ fetchVouchers ~ data:', result);
               if (result.statusCode === 200)
                   dispatch(setVouchers(result.data));
           } catch (error) {
               console.error('Error fetching vouchers:', error);
           }
       };

       fetchVouchers();
   }, [dispatch]);

   const [showDialog, setShowDialog] = useState<string | null>(null);
   const handleDialogDelete = async () => {
       if (!showDialog) return;
       try {
           const response = await fetch(
               `http://localhost:4200/api/vouchers/${showDialog}`,
               {
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
               }
           );

           if (response.ok) {
               dispatch(deleteVouchers({ voucherId: showDialog }));
               setShowDialog(null);
               console.log('Voucher deleted successfully');
           } else {
               console.error('Failed to delete voucher');
           }
       } catch (error) {
           console.error('Error deleting voucher:', error);
       }
   };


  return (
      <>
          <div className="min-h-[800px] w-full p-5">
              <div className="flex w-full items-center justify-end py-5">
                  <Button
                      onClick={() =>
                          handleNavigation('/home/vouchers/addVoucher')
                      }
                      className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                  >
                      <p className="flex items-center justify-center text-sm">
                          <TicketPlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                          Add New Voucher
                      </p>
                  </Button>
              </div>
              <div className="my-5 min-h-[32rem] overflow-y-hidden">
                  <div className="max-[768px]:w-[800px]">
                      <div className="flex gap-1 px-2.5 py-5">
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Code
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Valid From
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Until From
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Redeem Count
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Max Redeem
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Value
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Type
                              </span>
                          </div>
                          <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Visibility
                              </span>
                          </div>
                          <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                              <span className="text-txt-black block text-sm font-semibold capitalize leading-normal">
                                  Actions
                              </span>
                          </div>
                      </div>
                      {vouchers.map((voucher) => (
                          <div
                              key={voucher.id}
                              className="mb-5 flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 shadow-md"
                          >
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.code}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.valid_from}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.until_from}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.redeem_count}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.max_redeem}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.value}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.type}
                                  </span>
                              </div>
                              <div className="w-2/12 basis-2/12 overflow-hidden overflow-ellipsis">
                                  <span className="block text-sm font-semibold capitalize leading-normal text-gray-500">
                                      {voucher.visibility}
                                  </span>
                              </div>
                              <div className="w-1/12 basis-1/12 overflow-hidden overflow-ellipsis">
                                  <div className="flex items-center justify-end">
                                      <Button
                                          onClick={() =>
                                              handleNavigation(
                                                  '/home/vouchers/addVoucher'
                                              )
                                          }
                                          type="button"
                                          className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                      >
                                          <PencilLine className="text-4xl text-gray-500" />
                                      </Button>
                                      <Button
                                          onClick={() =>
                                              setShowDialog(voucher.id)
                                          }
                                          type="button"
                                          className="inline-flex h-10 w-10 items-center justify-center bg-transparent object-contain p-0 text-sm hover:bg-transparent"
                                      >
                                          <Trash2 className="text-4xl text-gray-500" />
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="my-5">
                      <Pagination>
                          <PaginationContent>
                              <PaginationItem className="">
                                  <PaginationPrevious
                                      href="#"
                                      className="bg-transparent hover:bg-transparent"
                                  />
                              </PaginationItem>
                              <PaginationItem>
                                  <PaginationLink
                                      href="#"
                                      className="bg-transparent hover:bg-transparent"
                                  >
                                      <span className="text-red-300 hover:text-red-300">
                                          1
                                      </span>
                                  </PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                  <PaginationEllipsis className="text-red-300 hover:text-red-300" />
                              </PaginationItem>
                              <PaginationItem>
                                  <PaginationNext
                                      href="#"
                                      className="bg-transparent hover:bg-transparent"
                                  />
                              </PaginationItem>
                          </PaginationContent>
                      </Pagination>
                  </div>
              </div>
          </div>
          <Dialog open={showDialog !== null}>
              <DialogContent className="h-[336px] w-[512px] rounded-[2rem]">
                  <div className="flex flex-col items-center justify-center">
                      <Trash2 className="absolute mb-28 size-28 rounded-lg bg-white text-red-700" />
                      <div className="mt-16 flex items-center justify-center text-lg font-extrabold text-red-700">
                          Are you sure?
                      </div>
                      <div className="mt-3 text-center text-sm font-medium text-red-300">
                          Want to Delete Voucher...
                      </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-around gap-4 p-4">
                      <Button
                          className="rounded-xl bg-red-700 px-36 py-3 font-bold text-red-100 hover:bg-red-700"
                          onClick={handleDialogDelete}
                      >
                          {vouchers.find((voucher) => voucher.id === showDialog)
                              ?.delete
                              ? ''
                              : 'Delete'}
                      </Button>
                  </div>
              </DialogContent>
          </Dialog>
      </>
  );
}


export default Vouchers;
