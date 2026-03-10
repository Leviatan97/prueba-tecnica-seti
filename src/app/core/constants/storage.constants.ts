export const STORAGE_KEYS = {
  TODOS: 'todos',
  CATEGORIES: 'categories'
} as const;

export const CATEGORY_CONSTANTS = {
  UNSELECTED: 'none',
  MAX_LENGTH: 50
} as const;

export const TODO_CONSTANTS = {
  MAX_LENGTH: 100
} as const;

export const UI_TEXTS = {
  TITLES: {
    TODOS: 'Tareas',
    CATEGORIES: 'Categorías',
    NEW_TODO: 'Nueva Tarea',
    NEW_CATEGORY: 'Nueva Categoría',
    CONFIRM: 'Confirmar Registro',
    DELETE_CATEGORY: 'Eliminar Categoría'
  },
  LABELS: {
    ALL: 'Todas',
    ALL_CATEGORIES: 'Todas las categorías',
    FILTER_BY_CAT: 'Filtrar por categoría',
    NAME: 'Nombre',
    CATEGORY: 'Categoría',
    CREATE: 'Crear',
    SAVE: 'Guardar',
    CANCEL: 'Cancelar',
    CONTINUE: 'Continuar',
    EDIT: 'Editar',
    SUMMARY_TASK: 'Resumen de la Tareas',
    SUMMARY_CAT: 'Resumen de la Categoría',
    CAT_SELECTED: 'Categoría seleccionada.',
    CAT_READY: 'Tu categoría está lista.',
    TODO_COMPLETED: 'Tarea completada',
    STATUS_FILTER: 'Filtrar por estado',
    STATUS_ALL: 'Todas las tareas',
    STATUS_COMPLETED: 'Completadas',
    STATUS_PENDING: 'Pendientes'
  },
  PLACEHOLDERS: {
    TODO_TITLE: '¿Qué hay que hacer?',
    CAT_NAME: 'Ej: Trabajo, Personal, Compras...',
    SEARCH_TASKS: 'Buscar tareas...',
    SEARCH_CATEGORIES: 'Buscar categorías...',
    SEARCH: 'Buscar...',
    CATEGORY_FILTER: 'Filtrar por categoría',
    STATUS_FILTER: 'Seleccionar estado'
  },
  BUTTONS: {
    DELETE: 'Eliminar',
    CANCEL: 'Cancelar'
  },
  EMPTY_STATES: {
    NO_DATA: {
      TITLE: 'Sin registros',
      DESCRIPTION: 'No hay información para mostrar en este momento.'
    },
    NO_TODOS: {
      TITLE: 'No hay tareas',
      DESCRIPTION: 'Crea tareas para mantenerte organizado.'
    },
    NO_CATEGORIES: {
      TITLE: 'No hay categorías',
      DESCRIPTION: 'Crea categorías para organizar tus tareas de mejor manera.'
    }
  },
  PROMPTS: {
    NAME_CAT: '¿Cómo llamarás a tu categoría?',
    CAT_LIST_READY: 'Tu categoría está lista para ser usada.',
    WHAT_TO_DO: '¿Qué tienes pendiente por hacer?',
    DELETE_TODO_CONFIRM: '¿Estás seguro de que deseas eliminar esta tarea?',
    DELETE_CAT_CONFIRM: '¿Estás seguro de que deseas eliminar esta categoría? Las tareas asociadas no se eliminarán.'
  }
} as const;
