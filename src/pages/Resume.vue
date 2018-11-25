<template>
    <div class="container grid-xl resume">
        <h1 class="caption text-uppercase"><span>{{ $t('menu.resume') }}</span></h1>
        <div class="pt-2 columns">
            <div class="column col-7 col-md-12 mb-2">
                <h3>
                    <span class="text-bold bg-dark px-2">
                        {{ $t('resume.subtitle.education') }}
                    </span>
                </h3>
                <div v-for="(item, index) in education"
                     :key="item.organization">
                    <div class="tile">
                        <div class="tile-content">
                            <p class="tile-title m-0">
                                {{ $t('resume.education.' + item.type + '.organization') }}
                                <span class="float-right">{{ item.from }} {{ $t('prepositions.to') }} {{ item.to !== undefined ? item.to : $t('resume.present') }}</span>
                            </p>
                            <p class="tile-subtitle m-0">{{ $t('resume.education.' + item.type + '.degree') }} – {{
                                $t('resume.education.' + item.type + '.major') }}</p>
                        </div>
                    </div>
                    <div v-if="index !== education.length - 1" class="divider"></div>
                </div>
            </div>
            <div class="column col-ml-auto col-4 col-md-12">
                <h3>
                    <span class="text-bold bg-dark px-2">
                        {{ $t('resume.subtitle.skills') }}
                    </span>
                </h3>
                <div v-for="(item, index) in skills"
                     :key="item.name">
                    <div class="tile tile-content">
                        <div class="bar">
                            <div class="bar-item tooltip"
                                 :data-tooltip="item.percentage + '%'"
                                 role="progressbar" :style="'width:' + item.percentage + '%;'"
                                 :aria-valuenow="item.percentage"
                                 aria-valuemin="0"
                                 aria-valuemax="100">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                    <div v-if="index !== skills.length - 1" class="divider"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'resume',
    data: () => ({
      education: [
        {
          type: 'higher',
          from: 2016,
        },
        {
          type: 'middle-level',
          from: 2012,
          to: 2016,
        },
        {
          type: 'secondary',
          from: 2007,
          to: 2012,
        },
      ],
      skills: [
        {name: 'PHP', percentage: 80},
        {name: 'C#', percentage: 80},
        {name: 'C / C++', percentage: 70},
        {name: 'Java', percentage: 70},
        {name: 'HTML, CSS, JavaScript', percentage: 70},
      ],
    }),
  }
</script>

