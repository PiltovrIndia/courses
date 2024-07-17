export default function GetId(prefix: string): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    
    // console.log(prefix + result);
    return prefix + result;
  }