export const Spinner = () => (
  <svg width="300" height="300" viewBox="0 0 38 38">
    <g transform="translate(19 19)">
      <g transform="rotate(0)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.125"
            to="0.125"
            dur="1.2s"
            begin="0s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.125"
          />
        </circle>
      </g>
      <g transform="rotate(45)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.25"
            to="0.25"
            dur="1.2s"
            begin="0.15s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.25"
          />
        </circle>
      </g>
      <g transform="rotate(90)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.375"
            to="0.375"
            dur="1.2s"
            begin="0.3s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.375"
          />
        </circle>
      </g>
      <g transform="rotate(135)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.5"
            to="0.5"
            dur="1.2s"
            begin="0.44999999999999996s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.5"
          />
        </circle>
      </g>
      <g transform="rotate(180)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.625"
            to="0.625"
            dur="1.2s"
            begin="0.6s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.625"
          />
        </circle>
      </g>
      <g transform="rotate(225)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.75"
            to="0.75"
            dur="1.2s"
            begin="0.75s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.75"
          />
        </circle>
      </g>
      <g transform="rotate(270)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="0.875"
            to="0.875"
            dur="1.2s"
            begin="0.8999999999999999s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;0.875"
          />
        </circle>
      </g>
      <g transform="rotate(315)">
        <circle cx="0" cy="12" r="3" fill="#339933" opacity="0.125">
          <animate
            attributeName="opacity"
            from="1"
            to="1"
            dur="1.2s"
            begin="1.05s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="1;1"
          />
        </circle>
      </g>
    </g>
  </svg>
);
