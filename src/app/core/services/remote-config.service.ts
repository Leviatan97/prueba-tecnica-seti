import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getBoolean } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  constructor(private remoteConfig: RemoteConfig) {}

  /**
   * Obtiene el valor de un Feature Flag desde Remote Config.
   * @param key Nombre del parámetro en Firebase (ej: 'flagCreacion')
   */
  async isFeatureEnabled(key: string): Promise<boolean> {
    try {
      await fetchAndActivate(this.remoteConfig);
      return getBoolean(this.remoteConfig, key);
    } catch (err) {
      console.error('Error al obtener Remote Config:', err);
      return false; 
    }
  }

  async getBoolean(key: string): Promise<boolean> {
    return this.isFeatureEnabled(key);
  }
}
