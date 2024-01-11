<template>
  <div class="-mt-4">
    <div class="relative bg-cover p-4 md:p-8 flex flex-col items-center justify-center space-y-3 md:space-y-6 rounded-md mb-8 md:mb-12" :style="`background-image: url(${require('@/assets/images/traumanwalt-profile-cover.jpeg')});`">
      <div class="absolute top-0 left-0 h-full w-full opacity-40 bg-black rounded-md"></div>
      <div class="profile-photo z-10 bg-cover border border-white h-36 w-36 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${photoUrl});`"></div>
      <div class="z-10 text-center text-white">
        <span class="block uppercase text-lg xl:text-xl my-1">{{ jobTitle }}</span>
        <h1>{{ fullNameWithoutJobTitle }}</h1>
        <span v-if="lawFirm.name" class="block text-base xl:text-lg mt-2">{{ lawFirm.name }}</span>
      </div>
      <div v-if="profile.linkedin_url || profile.xing_url || profile.facebook_url || profile.twitter_url || profile.instagram_url || profile.youtube_url" class="z-10 flex justify-center space-x-4 py-2 md:py-0">
        <a v-if="profile.linkedin_url" class="text-white hover:text-white" :href="profile.linkedin_url" target="_blank" rel="nofollow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-linkedin h-5 w-5 xl:h-6 xl:w-6" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg>
        </a>
        <a v-if="profile.xing_url" class="text-white hover:text-white" :href="profile.xing_url" target="_blank" rel="nofollow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-5 w-5 xl:h-6 xl:w-6" viewBox="0 0 540.543 540.543">
            <g>
	            <g>
		            <path d="M129.989,378.772c8.274,0,15.361-5.006,21.243-15.036c53.813-95.423,81.806-145.093,83.991-149.028l-53.593-93.458
			            c-5.667-9.804-12.858-14.707-21.567-14.707H81.953c-5.019,0-8.495,1.634-10.459,4.902c-2.399,3.268-2.289,7.301,0.325,12.087
			            l52.613,91.176c0.214,0.232,0.214,0.331,0,0.331L41.75,361.453c-2.172,4.149-2.172,8.066,0,11.757
			            c2.173,3.715,5.557,5.562,10.129,5.562H129.989z"/>
		            <path d="M488.492,0h-78.758c-8.495,0-15.472,4.902-20.912,14.707C277.053,212.97,219.206,315.596,215.283,322.555l110.784,203.282
			            c5.227,9.804,12.418,14.706,21.567,14.706h78.104c4.791,0,8.28-1.634,10.459-4.902c2.172-3.715,2.068-7.748-0.325-12.099
			            L326.073,322.555v-0.318L498.627,16.995c2.393-4.571,2.393-8.592,0-12.087C496.662,1.634,493.284,0,488.492,0z"/>
	            </g>
            </g>
          </svg>
        </a>
        <a v-if="profile.facebook_url" class="text-white hover:text-white" :href="profile.facebook_url" target="_blank" rel="nofollow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-facebook h-5 w-5 xl:h-6 xl:w-6" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
          </svg>
        </a>
        <a v-if="profile.twitter_url" class="text-white hover:text-white" :href="profile.twitter_url" target="_blank" rel="nofollow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-twitter h-5 w-5 xl:h-6 xl:w-6" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
          </svg>
        </a>
        <a v-if="profile.instagram_url" class="text-white hover:text-white" :href="profile.instagram_url" target="_blank" rel="nofollow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram h-5 w-5 xl:h-6 xl:w-6" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
        </a>
        <a v-if="profile.youtube_url" class="text-white hover:text-white" :href="profile.youtube_url" target="_blank" rel="nofollow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube h-5 w-5 xl:h-6 xl:w-6" viewBox="0 0 16 16">
            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
          </svg>
        </a>
      </div>
      <nuxt-link v-if="profile.fake" :to="`/${profile.slug}/profil-entfernen`" class="remove-profile-link flex items-center space-x-2 text-sm text-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
          <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
        </svg>
        <span>Profil entfernen</span>
      </nuxt-link>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
      <article class="flex flex-col space-y-6 md:space-y-8 w-full lg:w-2/3">
        <section class="flex flex-col space-y-4 md:space-y-6" v-if="phoneNumber || profile.contact_email || profile.website_url">
          <h2>Kontakt</h2>
          <div class="flex flex-col space-y-2">
            <div v-if="profile.address_line" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                </svg>
              </div>
              <span>{{ fullAddress }}</span>
            </div>
            <div v-if="phoneNumber" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
              </div>
              <span>
                <a v-show="showPhoneNumber" :href="phoneNumberUri">{{ nationalPhoneNumber }}</a>
                <a v-show="!showPhoneNumber" class="cursor-pointer" @click="showPhoneNumber = true">Telefonnummer anzeigen</a>
              </span>
            </div>
            <div v-if="profile.contact_email" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              </div>
              <a :href="mailToLink">{{ profile.contact_email }}</a>
            </div>
            <div v-if="profile.website_url" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-globe" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                </svg>
              </div>
              <a :href="profile.website_url" rel="nofollow" target="_blank">{{ websiteLinkTitle }}</a>
            </div>
          </div>
        </section>
        <hr v-if="profile.about" />
        <section v-if="profile.about" class="flex flex-col space-y-4 md:space-y-6">
          <h2>Über {{ firstName }} {{ lastName }}</h2>
          <p v-if="!profile.about">{{ firstName }} {{ lastName }} hat noch nichts über sich geschrieben.</p>
          <div v-if="profile.about" v-html="profile.about"></div>
        </section>
        <hr v-if="legalFields.length || languages.length || memberships.length" />
        <section v-if="legalFields.length || languages.length || memberships.length" class="flex flex-col space-y-4 md:space-y-6">
          <h2>Kompetenzen</h2>
          <div v-if="legalFields.length">
            <h3 class="mb-4">Rechtsgebiete</h3>
            <p v-if="!legalFields.length">{{ firstName }} {{ lastName }} hat keine Rechtsgebiete angegeben.</p>
            <div v-if="legalFields.length" class="mb-2">
              <nuxt-link :to="`/anwaelte/${legalField.slug}`" class="tag-link inline-block bg-gray-100 px-2 py-1 rounded-md w-fit mr-1 mt-1 md:mr-2 md:mt-2" v-for="(legalField, index) in legalFields" :key="index">
                {{ getLegalFieldName(legalField, profile) }}
              </nuxt-link>
            </div>
          </div>
          <div v-if="languages.length">
            <h3 class="mb-4">Sprachen</h3>
            <p v-if="!languages.length">{{ firstName }} {{ lastName }} hat keine Sprachen angegeben.</p>
            <div v-if="languages.length" class="mb-2">
              <span class="inline-block bg-gray-100 px-2 py-1 rounded-md w-fit mr-1 mt-1 md:mr-2 md:mt-2" v-for="(language, index) in languages" :key="index">
                {{ language.name }}
              </span>
            </div>
          </div>
          <div v-if="memberships.length">
            <h3 class="mb-4">Mitgliedschaften</h3>
            <p v-if="!memberships.length">{{ firstName }} {{ lastName }} hat keine Mitgliedschaften angegeben.</p>
            <ul class="list-disc flex flex-col space-y-2 ml-5">
              <li v-for="(membership, index) in memberships" :key="index">{{ membership }}</li>
            </ul>
          </div>
        </section>
        <hr v-if="legalGuides.length" />
        <section v-if="legalGuides.length" class="flex flex-col space-y-4 md:space-y-6">
          <h2>Rechtstipps</h2>
          <p v-if="!legalGuides.length">{{ firstName }} {{ lastName }} hat noch keine Rechtstipps veröffentlicht.</p>
          <div v-if="legalGuides.length" class="grid md:grid-cols-2 gap-4">
            <nuxt-link class="legal-guide" :to="`/rechtstipps/${legalGuide.slug}`" v-for="(legalGuide, index) in legalGuides" :key="index">
              <div class="border rounded-md shadow-md p-4 lg:p-6 h-full w-full">
                <h3 class="mb-2">{{ legalGuide.title }}</h3>
                <span class="text-gray-500">Veröffentlicht: {{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm') }}</span>
                <p class="mt-2 lg:mt-4" v-html="getExcerpt(legalGuide.content)"></p>
              </div>
            </nuxt-link>
          </div>
          <nuxt-link v-if="legalGuides.length" class="flex items-center space-x-2 pt-1 w-fit" :to="`/${profile.slug}/rechtstipps`">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
            <span>Alle Rechtstipps lesen</span>
          </nuxt-link>
        </section>
        <hr />
        <section class="flex flex-col space-y-4 md:space-y-6">
          <h2>Bewertungen</h2>
          <div class="flex justify-between">
            <div class="flex flex-col space-y-1 sm:flex-row sm:space-x-2 sm:space-y-0">
              <span class="text-3xl lg:text-4xl">{{ (Math.round(averageRating * 100) / 100).toFixed(1).replace('.', ',') }}</span>
              <div>
                <star-rating class="mb-1" :increment="0.1" :read-only="true" :show-rating="false" :star-size="30" v-model="averageRating" />
                <nuxt-link :to="`/${profile.slug}/bewertungen`" class="block" style="margin-left: 4px;">{{ reviewCount }} Bewertung{{ reviewCount !== 1 ? 'en' : '' }}</nuxt-link>
              </div>
            </div>
            <div>
              <Btn class="flex items-center space-x-2" @click="rateUser">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <span>Bewerten</span>
              </Btn>
            </div>
          </div>
          <p v-if="!reviews.length">{{ firstName }} {{ lastName }} hat noch keine Bewertungen erhalten.</p>
          <div class="border border-transparent rounded-md shadow-md p-4" v-for="(review, index) in reviews" :key="index">
            <div class="flex flex-col space-y-1 xl:flex-row xl:items-center xl:space-x-2 xl:space-y-0 mb-2">
              <star-rating :read-only="true" :show-rating="false" :star-size="30" v-model="review.rating" />
              <h3 class="text-lg" style="margin-top: 4px;">{{ review.title }}</h3>
            </div>
            <span class="block text-gray-500 mb-2">von <b>{{ review.author || 'Anonym' }}</b> am {{ $moment(review.created_at).format('DD.MM.YYYY') }}</span>
            <p>„{{ review.description }}“</p>
            <div v-if="review.comment" class="mt-4">
              <h4 class="text-base mb-1">Kommentar von {{ firstName }} {{ lastName }}</h4>
              <p v-show="review.comment" class="border-l-4 pl-2">{{ review.comment }}</p>
            </div>
          </div>
          <nuxt-link v-if="reviews.length" class="flex items-center space-x-2 pt-1 w-fit" :to="`/${profile.slug}/bewertungen`">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
            <span>Alle Bewertungen lesen</span>
          </nuxt-link>
        </section>
        <hr v-if="profile.law_firm.name" />
        <section v-if="profile.law_firm.name">
          <h2 class="mb-4">Über die Kanzlei</h2>
          <p v-if="!profile.law_firm.users.length">{{ firstName }} {{ lastName }} hat keine Kollegen angegeben.</p>
          <div class="pt-2 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0" v-if="profile.law_firm">
            <div>
              <div class="border bg-center bg-no-repeat h-32 w-32 rounded-md" :style="`background-image: url(${profile.law_firm.logo_url}); background-size: 90%;`" />
            </div>
            <div>
              <b class="block md:text-lg mt-1 sm:mt-0">{{ profile.law_firm.name }}</b>
              <span class="block">{{ fullLawFirmAddress }}</span>
              <nuxt-link class="flex items-center space-x-2 w-fit" :to="`/kanzlei/${profile.law_firm.slug}`">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
                <span>Zum Kanzleiprofil</span>
              </nuxt-link>
            </div>
          </div>
          <div v-if="lawFirmColleagues.length" class="pt-6 md:pt-8">
            <h3 class="mb-6">Kollegen</h3>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4" v-if="profile.law_firm">
              <div class="flex items-center space-x-4" v-for="(user, index) in lawFirmColleagues" :key="index">
                <div>
                  <div class="bg-cover h-20 w-20 rounded-full mb-2" :style="`background-image: url(${user.photo_url || require('@/assets/images/photo-default.jpeg')});`"></div>
                </div>
                <div>
                  <span class="block text-gray-500 text-sm">{{ getProfileJobTitle(user) }}</span>
                  <nuxt-link :to="`/${user.slug}`" class="block font-bold">{{ user.first_name }} {{ user.last_name }}</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
      <div class="hidden lg:block w-full lg:w-1/3">
        <div class="sticky top-4 border border-gray-300 p-4 rounded-md" style="background-color: #f8f8f8;">
          <div class="flex justify-center w-full mb-3">
            <div class="profile-photo bg-cover h-32 w-32 rounded-full" :style="`background-image: url(${photoUrl});`"></div>
          </div>
          <h2 class="text-center text-xl xl:text-2xl mb-4">{{ firstName }} {{ lastName }}</h2>
          <form class="flex flex-col space-y-4" @submit.prevent>
            <Btn @click="processMessage">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
              </svg>
              <span>Nachricht senden</span>
            </Btn>
            <Btn v-if="phoneNumber" type="light" @click="showPhoneNumber = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
              </svg>
              <span>{{ showPhoneNumber ? nationalPhoneNumber : 'Jetzt anrufen' }}</span>
            </Btn>
          </form>
        </div>
      </div>
      <div class="lg:hidden bg-white border-t-2 flex space-x-2 p-2 fixed bottom-0 left-0 w-full z-20">
        <Btn v-if="phoneNumber" type="light" class="w-full" @click="callPhoneNumber">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>
          <span>Anrufen</span>
        </Btn>
        <Btn class="w-full" @click="processMessage">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
          </svg>
          <span>Nachricht</span>
        </Btn>
      </div>
    </div>
  </div>
</template>

<script>
import parsePhoneNumber from 'libphonenumber-js'

export default {
  name: 'ProfilePage',
  head() {
    return {
      title: `${this.fullName} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ],
      script: [
        {
          json: {
            "@context": "http://schema.org",
            "@type": "Organization",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": this.profile.address_line,
              "postalCode": this.profile.postal_code,
              "addressLocality": this.profile.city,
              "addressCountry": this.profile.country
            },
            "name": `${this.profile.salutation} ${this.fullName}`,
            "telephone": this.nationalPhoneNumber,
            "faxNumber": "",
            "image": this.profile.photo_url || 'https://traumanwalt.com/images/traumanwalt-lawyer-photo.png',
            "url": `https://traumanwalt.com${this.$route.path}`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "bestRating": "5",
              "worstRating": "1",
              "ratingValue": this.averageRating,
              "ratingCount": this.reviewCount
            }
          },
          type: 'application/ld+json'
        }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const profile = await app.$axios.$get(`/api/profiles/${params.slug}`)
    if (!profile) redirect('/anwaelte')

    // count clicks on profile
    await app.$axios.$post('/api/profile-views/update', {
      slug: params.slug
    })

    return {
      profile,
      showPhoneNumber: false
    }
  },
  computed: {
    salutation() {
      return this.profile.salutation
    },
    jobTitle() {
      if (!this.profile.job_title) return this.profile.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
      return this.profile.job_title
    },
    academicTitle() {
      return this.profile.academic_title
    },
    firstName() {
      return this.profile.first_name
    },
    lastName() {
      return this.profile.last_name
    },
    fullName() {
      return [this.jobTitle, this.academicTitle, this.firstName, this.lastName].join(' ')
    },
    fullNameWithoutJobTitle() {
      return [this.academicTitle, this.firstName, this.lastName].join(' ')
    },
    photoUrl() {
      return this.profile.photo_url || require('@/assets/images/photo-default.jpeg')
    },
    lawFirm() {
      return this.profile.law_firm
    },
    fullAddress() {
      const fullAddress = []

      const addressLine = this.profile.address_line
      fullAddress.push(addressLine)

      if (this.profile.postal_code || this.profile.city) {
        const city = []
        city.push(this.profile.postal_code)
        city.push(this.profile.city)
        fullAddress.push(city.join(' '))
      }

      return fullAddress.join(', ')
    },
    fullLawFirmAddress() {
      const fullAddress = []

      const addressLine = this.profile.law_firm.address_line
      fullAddress.push(addressLine)

      if (this.profile.law_firm.postal_code || this.profile.law_firm.city) {
        const city = []
        city.push(this.profile.law_firm.postal_code)
        city.push(this.profile.law_firm.city)
        fullAddress.push(city.join(' '))
      }

      return fullAddress.join(', ')
    },
    phoneNumber() {
      return this.profile.landline_number || this.profile.mobile_number
    },
    phoneNumberUri() {
      return parsePhoneNumber(this.phoneNumber).getURI()
    },
    nationalPhoneNumber() {
      return parsePhoneNumber(this.phoneNumber).formatNational()
    },
    mailToLink() {
      const subject = 'Kontaktanfrage über Traumanwalt'
      const message = `${ this.salutation === 'Frau' ? `Sehr geehrte Frau` : `Sehr geehrter Herr` } ${this.lastName},\n\ngerne würde ich eine Beratung in Ihrer Kanzlei in Anspruch nehmen.\n\nBitte kontaktieren Sie mich bezüglich einer Terminvereinbarung.\n\nMit freundlichen Grüßen\n\n\n\nFreiwillige Angaben\n\nMein Name:\n\nMeine Telefonnummer:\n\nMeine Adresse:\n\nMein Anliegen:`
      return `mailto:${this.profile.contact_email}?subject=${subject}&body=${encodeURIComponent(message)}`
    },
    websiteLinkTitle() {
      if (!this.profile.website_url) return null
      return this.profile.website_url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/+$/, '')
    },
    legalFields() {
      return this.profile.legal_fields
    },
    languages() {
      return this.profile.languages
    },
    memberships() {
      return this.profile.memberships ? this.profile.memberships.split(';') : []
    },
    legalGuides() {
      return this.profile.legal_guides
    },
    reviews() {
      return this.profile.reviews
    },
    reviewCount() {
      return this.reviews[0] ? parseInt(this.reviews[0].total_count) : 0
    },
    averageRating() {
      return this.reviews[0] ? (parseInt(this.reviews[0].total_sum) / parseInt(this.reviews[0].total_count)) : 0
    },
    lawFirmColleagues() {
      if (!this.lawFirm.users.length) return []
      return this.lawFirm.users.filter(u => u.slug !== this.profile.slug)
    }
  },
  methods: {
    getLegalFieldName(legalField, profile) {
      if (legalField.specialized) {
        const preposition = profile.salutation === 'Frau' ? 'Fachanwältin' : 'Fachanwalt'
        return `${preposition} ${legalField.name}`
      }
      return legalField.name
    },
    getProfileJobTitle(profile) {
      if (!profile.job_title) return profile.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
      return profile.job_title
    },
    getExcerpt(content) {
      const words = content.split(' ')
      if (words.length <= 25) return content
      return words.slice(0, 25).join(' ') + '...'
    },
    rateUser() {
      this.$router.push(`/${this.profile.slug}/bewerten`)
    },
    processMessage() {
      this.$router.push(`/${this.profile.slug}/nachricht`)
    },
    callPhoneNumber() {
      window.open(this.phoneNumberUri)
    }
  }
}
</script>

<style lang="postcss" scoped>
.profile-photo {
  margin-top: 4px !important;
}

.tag-link {
  @apply text-current;

  &:hover {
    @apply no-underline;
  }

  & h2 {
    &:hover {
      @apply underline;
    }
  }
}

.remove-profile-link {
  &:hover {
    color: #ffffff !important;
  }
}

.legal-guide {
  @apply text-current;

  &:hover {
    @apply no-underline;
  }

  & h2 {
    &:hover {
      @apply underline;
    }
  }
}

@media (max-width: 768px) {
  .profile-photo {
    margin-top: 8px !important;
  }
}
</style>