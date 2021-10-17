<template>
  <button
    :disabled="disabled"
    :style="`height: fit-content; ${full ? '' : 'width: fit-content;'}`"
    :class="`cursor-pointer ${disabled ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : `${bgColors[color]} ${textColors[color]} ${hoverColors[color]} ${borderColors[color]}`} ${$store.state.isMobile ? 'rounded-half' : 'rounded-main'} ${small ? 'px-3 py-1' : 'px-4 py-2'} ${full ? 'w-full' : ''} transition border-2 border-transparent outline-none text-sm`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  data() {
    return {
      // this properties are written literal to avoid tailwind purge
      bgColors: {
        gray: "bg-gray-100",
        red: "bg-red-100",
        yellow: "bg-yellow-100",
        green: "bg-green-100",
        blue: "bg-blue-100",
        indigo: "bg-indigo-100",
        purple: "bg-purple-100",
        pink: "bg-pink-100",
      },
      hoverColors: {
        gray: "hover:bg-gray-200",
        red: "hover:bg-red-200",
        yellow: "hover:bg-yellow-200",
        green: "hover:bg-green-200",
        blue: "hover:bg-blue-200",
        indigo: "hover:bg-indigo-200",
        purple: "hover:bg-purple-200",
        pink: "hover:bg-pink-200",
      },
      borderColors: {
        gray: "focus:border-gray-500",
        red: "focus:border-red-500",
        yellow: "focus:border-yellow-500",
        green: "focus:border-green-500",
        blue: "focus:border-blue-500",
        indigo: "focus:border-indigo-500",
        purple: "focus:border-purple-500",
        pink: "focus:border-pink-500",
      },
      textColors: {
        gray: "text-gray-700",
        red: "text-red-700",
        yellow: "text-yellow-700",
        green: "text-green-700",
        blue: "text-blue-700",
        indigo: "text-indigo-700",
        purple: "text-purple-700",
        pink: "text-pink-700",
      },
    };
  },
  props: {
    color: {
      type: String,
      default: "blue",
    },
    full: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>