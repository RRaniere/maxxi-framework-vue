import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';


async function fetchProducts() { 

    try { 
        const response = await fetchWrapper.get('/shopping/get-products');
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}

async function createInvoice(productId: number)  {
    try {
      const response = await fetchWrapper.post('/shopping/create-invoice', {productId});
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


async function cancelInvoice()  {
    try {
      const response = await fetchWrapper.post('/shopping/cancel-invoice');
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

async function getPendingInvoices() { 

    try {
        const response = await fetchWrapper.post('/shopping/get-pending-invoices');
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }

}

async function getPendingInvoicePaymentHistory() { 

    try {
        const response = await fetchWrapper.post('/shopping/get-pending-invoice-payment-history');
        return response;
    } catch (error) {
    console.error(error);
    throw error;
    }

}



export { fetchProducts ,createInvoice, cancelInvoice, getPendingInvoices, getPendingInvoicePaymentHistory};