export async function saveCustomerData(formData: any) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh");
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`/api/Customer/SaveOtherSource`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: myHeaders,
    });
    

    const res = await response.json()
    console.log(res);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return res

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

