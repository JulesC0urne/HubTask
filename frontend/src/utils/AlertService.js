import Swal from 'sweetalert2';

class AlertService {

  static success(message, title = 'Succès') {

    return Swal.fire({

      title: title,

      text: message,

      icon: 'success',

      customClass: {

        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Ajout de border-radius pour arrondir les bords

        confirmButton: 'bg-primary-500 text-white-500 hover:bg-primary-600 rounded-md', // Style du bouton de confirmation

      },

      confirmButtonText: 'Okay',

    });

  }



  static error(message, title = 'Erreur') {

    return Swal.fire({

      title: title,

      text: message,

      icon: 'error',

      customClass: {

        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Ajout de border-radius pour arrondir les bords

        confirmButton: 'bg-danger text-white-500 hover:bg-danger-dark rounded-md', // Style du bouton de confirmation

      },

      confirmButtonText: 'D’accord',

    });

  }



  static warning(message, title = 'Avertissement') {

    return Swal.fire({

      title: title,

      text: message,

      icon: 'warning',

      customClass: {

        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Ajout de border-radius pour arrondir les bords

        confirmButton: 'bg-secondary text-white-500 hover:bg-secondary-dark rounded-md', // Style du bouton de confirmation

      },

      confirmButtonText: 'Okay',

    });

  }



  static info(message, title = 'Info') {

    return Swal.fire({

      title: title,

      text: message,

      icon: 'info',

      customClass: {

        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Ajout de border-radius pour arrondir les bords

        confirmButton: 'bg-info text-white-500 hover:bg-info-dark rounded-md', // Style du bouton de confirmation

      },

      confirmButtonText: 'Okay',

    });

  }



  // Méthode pour une confirmation avec des boutons personnalisés

  static confirm(message, title = 'Confirmation') {

    return Swal.fire({

      title: title,

      text: message,

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Oui',

      cancelButtonText: 'Non',

      customClass: {

        popup: 'bg-neutral-800 text-white-500 border-neutral-600 rounded-lg',  // Ajout de border-radius pour arrondir les bords

        confirmButton: 'bg-primary-500 text-white-500 hover:bg-primary-600 rounded-md', // Bouton de confirmation

        cancelButton: 'bg-neutral-600 text-white-500 hover:bg-neutral-700 rounded-md', // Bouton d'annulation

      },

    });

  }

}



export default AlertService;
