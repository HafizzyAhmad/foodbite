import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  /**
   * normal stuff to store inside AsyncStorage
   * @param   key         name of the variable
   * @param   argument    object or anything
   * @returns Promise<void>
   */
  async addItem(key: string, argument: any): Promise<void> {
    const param: string = JSON.stringify(argument);
    return await AsyncStorage.setItem(key, param);
  }

  /**
   * normal stuff to retrieve from AsyncStorage
   * @param   key         name of the variable
   * @returns Promise<any>
   */
  async retrieveItem(key: string): Promise<any> {
    const value: string | null = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  }

  /**
   * simple function to remove data inside storage
   * @param   key         name of the variable
   * @returns Promise<void>
   */
  async removeItem(key: string): Promise<void> {
    return await AsyncStorage.removeItem(key);
  }
}

export default new Storage();
