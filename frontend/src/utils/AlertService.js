import Swal from 'sweetalert2';

/**
 * Classe AlertService qui encapsule l'utilisation de SweetAlert2 pour gérer différents types d'alertes.
 */
class AlertService {

  /**
   * Affiche une alerte de succès.
   * 
   * @param {string} message Le message à afficher dans l'alerte.
   * @param {string} [title='Succès'] Le titre de l'alerte (par défaut "Succès").
   * @returns {Promise} La promesse retournée par Swal.fire.
   */
  static success(message, title = 'Succès') {
    return Swal.fire({
      title: title,  // Le titre de l'alerte
      text: message,  // Le message de l'alerte
      icon: 'success',  // L'icône qui représente un succès
      customClass: {  // Personnalisation de l'apparence de l'alerte
        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Style du popup
        confirmButton: 'bg-primary-500 text-white-500 hover:bg-primary-600 rounded-md',  // Style du bouton de confirmation
      },
      confirmButtonText: 'Okay',  // Texte du bouton de confirmation
    });
  }

  /**
   * Affiche une alerte d'erreur.
   * 
   * @param {string} message Le message à afficher dans l'alerte.
   * @param {string} [title='Erreur'] Le titre de l'alerte (par défaut "Erreur").
   * @returns {Promise} La promesse retournée par Swal.fire.
   */
  static error(message, title = 'Erreur') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',  // L'icône qui représente une erreur
      customClass: {
        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Style du popup
        confirmButton: 'bg-danger text-white-500 hover:bg-danger-dark rounded-md',  // Style du bouton de confirmation pour l'erreur
      },
      confirmButtonText: 'D’accord',  // Texte du bouton de confirmation
    });
  }

  /**
   * Affiche une alerte d'avertissement.
   * 
   * @param {string} message Le message à afficher dans l'alerte.
   * @param {string} [title='Avertissement'] Le titre de l'alerte (par défaut "Avertissement").
   * @returns {Promise} La promesse retournée par Swal.fire.
   */
  static warning(message, title = 'Avertissement') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',  // L'icône qui représente un avertissement
      customClass: {
        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Style du popup
        confirmButton: 'bg-secondary text-white-500 hover:bg-secondary-dark rounded-md',  // Style du bouton de confirmation pour l'avertissement
      },
      confirmButtonText: 'Okay',  // Texte du bouton de confirmation
    });
  }

  /**
   * Affiche une alerte d'information.
   * 
   * @param {string} message Le message à afficher dans l'alerte.
   * @param {string} [title='Info'] Le titre de l'alerte (par défaut "Info").
   * @returns {Promise} La promesse retournée par Swal.fire.
   */
  static info(message, title = 'Info') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'info',  // L'icône qui représente une information
      customClass: {
        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Style du popup
        confirmButton: 'bg-info text-white-500 hover:bg-info-dark rounded-md',  // Style du bouton de confirmation pour l'information
      },
      confirmButtonText: 'Okay',  // Texte du bouton de confirmation
    });
  }

  /**
   * Affiche une alerte de confirmation avec les boutons Oui/Non.
   * 
   * @param {string} message Le message à afficher dans l'alerte.
   * @param {string} [title='Confirmation'] Le titre de l'alerte (par défaut "Confirmation").
   * @returns {Promise} La promesse retournée par Swal.fire.
   */
  static confirm(message, title = 'Confirmation') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',  // L'icône qui représente une question pour la confirmation
      showCancelButton: true,  // Affiche le bouton d'annulation
      confirmButtonText: 'Oui',  // Texte du bouton de confirmation
      cancelButtonText: 'Non',  // Texte du bouton d'annulation
      customClass: {
        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Style du popup
        confirmButton: 'bg-primary-500 text-white-500 hover:bg-primary-600 rounded-md',  // Style du bouton de confirmation
        cancelButton: 'bg-neutral-600 text-white-500 hover:bg-neutral-700 rounded-md',  // Style du bouton d'annulation
      },
    });
  }

}

// Exportation de la classe AlertService pour l'utiliser dans d'autres composants ou fichiers.
export default AlertService;
